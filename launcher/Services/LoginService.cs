using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.Windows;
using v232.Launcher.WPF.Models;

namespace v232.Launcher.WPF.Services
{
    public class LoginService
    {
        private readonly static uint CREATE_SUSPENDED = 0x00000004;

        public Client CClient { get; set; }
        public string User { get; set; }
        public string Pass { get; set; }
        public long Token { get; set; }
        public bool Auth { get; set; }

        public LoginService()
        {
        }

        public LoginService(string user, string pass)
        {
            User = user;
            Pass = pass;
            Token = 0;
            Auth = false;
            CClient = null;
        }

        /// <summary>
        /// Auto-detects the hook DLL: Localhost.dll or msvn.dll
        /// </summary>
        public static string DetectHookDll(string baseDir = null)
        {
            if (string.IsNullOrEmpty(baseDir))
                baseDir = AppDomain.CurrentDomain.BaseDirectory;

            // 1. Configured hook in launcher.ini / ServerInfo
            if (!string.IsNullOrEmpty(ServerInfo.HookDll) && File.Exists(Path.Combine(baseDir, ServerInfo.HookDll)))
                return ServerInfo.HookDll;

            // 2. Official Localhost.dll
            if (File.Exists(Path.Combine(baseDir, "Localhost.dll")))
                return "Localhost.dll";

            // 3. msvn.dll fallback
            if (File.Exists(Path.Combine(baseDir, "msvn.dll")))
                return "msvn.dll";

            return !string.IsNullOrEmpty(ServerInfo.HookDll) ? ServerInfo.HookDll : "Localhost.dll";
        }

        #region Win32 API

        public struct PROCESS_INFORMATION
        {
            public IntPtr hProcess;
            public IntPtr hThread;
            public uint dwProcessId;
            public uint dwThreadId;
        }

        public struct STARTUPINFO
        {
            public uint cb;
            public string lpReserved;
            public string lpDesktop;
            public string lpTitle;
            public uint dwX;
            public uint dwY;
            public uint dwXSize;
            public uint dwYSize;
            public uint dwXCountChars;
            public uint dwYCountChars;
            public uint dwFillAttribute;
            public uint dwFlags;
            public short wShowWindow;
            public short cbReserved2;
            public IntPtr lpReserved2;
            public IntPtr hStdInput;
            public IntPtr hStdOutput;
            public IntPtr hStdError;
        }

        [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
        static extern bool CreateProcess(string lpApplicationName, string lpCommandLine, IntPtr lpProcessAttributes, IntPtr lpThreadAttributes,
                        bool bInheritHandles, uint dwCreationFlags, IntPtr lpEnvironment,
                        string lpCurrentDirectory, ref STARTUPINFO lpStartupInfo, out PROCESS_INFORMATION lpProcessInformation);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern uint ResumeThread(IntPtr hThread);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern IntPtr OpenProcess(uint dwDesiredAccess, int bInheritHandle, uint dwProcessId);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern int CloseHandle(IntPtr hObject);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern uint WaitForSingleObject(IntPtr hHandle, uint dwMilliseconds);

        [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Ansi)]
        static extern IntPtr GetProcAddress(IntPtr hModule, string lpProcName);

        [DllImport("kernel32.dll", SetLastError = true, CharSet = CharSet.Unicode)]
        static extern IntPtr GetModuleHandle(string lpModuleName);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern IntPtr VirtualAllocEx(IntPtr hProcess, IntPtr lpAddress, IntPtr dwSize, uint flAllocationType, uint flProtect);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern int WriteProcessMemory(IntPtr hProcess, IntPtr lpBaseAddress, byte[] buffer, uint size, int lpNumberOfBytesWritten);

        [DllImport("kernel32.dll", SetLastError = true)]
        static extern IntPtr CreateRemoteThread(IntPtr hProcess, IntPtr lpThreadAttribute, IntPtr dwStackSize, IntPtr lpStartAddress,
            IntPtr lpParameter, uint dwCreationFlags, out IntPtr lpThreadId);

        #endregion

        private static int Inject(uint processID, string dllPath)
        {
            if (!File.Exists(dllPath))
            {
                MessageBox.Show($"Hook DLL not found: {dllPath}\nPlease ensure Localhost.dll exists in the MapleStory folder.", "Inject Error", MessageBoxButton.OK, MessageBoxImage.Error);
                return 1;
            }

            if (processID == 0)
                return 1;

            IntPtr pLoadLibraryAddress = GetProcAddress(GetModuleHandle("Kernel32.dll"), "LoadLibraryW");
            bool isUnicode = true;
            if (pLoadLibraryAddress == IntPtr.Zero)
            {
                pLoadLibraryAddress = GetProcAddress(GetModuleHandle("Kernel32.dll"), "LoadLibraryA");
                isUnicode = false;
            }

            if (pLoadLibraryAddress == IntPtr.Zero)
                return 2;

            IntPtr processHandle = OpenProcess((0x2 | 0x8 | 0x10 | 0x20 | 0x400), 1, (uint)processID);
            if (processHandle == IntPtr.Zero)
                return 3;

            byte[] bytes = isUnicode
                ? System.Text.Encoding.Unicode.GetBytes(dllPath + "\0")
                : System.Text.Encoding.ASCII.GetBytes(dllPath + "\0");

            IntPtr lpAddress = VirtualAllocEx(processHandle, IntPtr.Zero, (IntPtr)bytes.Length, (0x1000 | 0x2000), 0X40);
            if (lpAddress == IntPtr.Zero)
            {
                CloseHandle(processHandle);
                return 4;
            }

            if (WriteProcessMemory(processHandle, lpAddress, bytes, (uint)bytes.Length, 0) == 0)
            {
                CloseHandle(processHandle);
                return 5;
            }

            IntPtr threadId;
            IntPtr hThread = CreateRemoteThread(processHandle, IntPtr.Zero, IntPtr.Zero, pLoadLibraryAddress, lpAddress, 0, out threadId);
            if (hThread == IntPtr.Zero)
            {
                int err = Marshal.GetLastWin32Error();
                MessageBox.Show($"CreateRemoteThread failed.\nError: {err}\nDLL: {dllPath}", "Inject Error", MessageBoxButton.OK, MessageBoxImage.Error);
                CloseHandle(processHandle);
                return 6;
            }

            // Wait for DLL to load (max 10 seconds)
            WaitForSingleObject(hThread, 10000);

            CloseHandle(hThread);
            CloseHandle(processHandle);
            return 0;
        }

        public byte LastAuthResult { get; set; } = 0;

        public async Task<bool> Authenticate()
        {
            try
            {
                if (CClient == null || !CClient.IsConnected())
                {
                    CClient = new Client();
                    if (!CClient.Connect())
                    {
                        LastAuthResult = 4;
                        return false;
                    }
                }

                var result = await Handlers.SendAuthRequest(User, Pass, CClient);
                LastAuthResult = result.result;

                if (result.result == 0)
                {
                    Token = result.token;
                    Auth = true;
                    return true;
                }

                Auth = false;
                return false;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                LastAuthResult = 4;
                Auth = false;
                return false;
            }
        }

        public bool LaunchMaple()
        {
            try
            {
                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                string exePath = Path.Combine(baseDir, "MapleStory.exe");
                if (!File.Exists(exePath))
                {
                    baseDir = Directory.GetCurrentDirectory();
                    exePath = Path.Combine(baseDir, "MapleStory.exe");
                }

                if (!File.Exists(exePath))
                {
                    MessageBox.Show($"MapleStory.exe not found in folder:\n{baseDir}\n\nPlease place the launcher files inside your MapleStory v265 game client folder.", "Client Not Found", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return false;
                }

                string hookDll = DetectHookDll(baseDir);
                string fullDllPath = Path.Combine(baseDir, hookDll);
                if (!File.Exists(fullDllPath))
                {
                    MessageBox.Show($"Hook DLL '{hookDll}' not found in folder:\n{baseDir}\n\nPlease ensure Localhost.dll is present.", "Hook Missing", MessageBoxButton.OK, MessageBoxImage.Warning);
                    return false;
                }

                STARTUPINFO si = new STARTUPINFO();
                si.cb = (uint)Marshal.SizeOf(typeof(STARTUPINFO));
                PROCESS_INFORMATION pi = new PROCESS_INFORMATION();

                string cmdLine = $"\"{exePath}\" WebStart {Token}";
                bool bCreateProc = CreateProcess(null, cmdLine, IntPtr.Zero, IntPtr.Zero, false, CREATE_SUSPENDED, IntPtr.Zero, baseDir, ref si, out pi);

                if (bCreateProc)
                {
                    int bInject = Inject(pi.dwProcessId, fullDllPath);
                    if (bInject == 0)
                    {
                        ResumeThread(pi.hThread);

                        CloseHandle(pi.hThread);
                        CloseHandle(pi.hProcess);

                        return true;
                    }
                    else
                    {
                        // Even if inject returned warning, resume to prevent stuck process
                        ResumeThread(pi.hThread);
                        CloseHandle(pi.hThread);
                        CloseHandle(pi.hProcess);
                        MessageBox.Show("DLL Injection returned code: " + bInject.ToString(), "Injection Warning", MessageBoxButton.OK, MessageBoxImage.Warning);
                        return false;
                    }
                }
                else
                {
                    int error = Marshal.GetLastWin32Error();
                    MessageBox.Show($"CreateProcess failed!\n\nError code: {error}\n\nMake sure:\n1. Launcher is in MapleStory folder\n2. MapleStory.exe exists\n3. Run as Administrator", "Launch Error", MessageBoxButton.OK, MessageBoxImage.Error);
                    return false;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Could not start the game.\n\nError: {ex.Message}\n\nMake sure the file is in your game folder and that this program is ran as admin.", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            return false;
        }
    }
}