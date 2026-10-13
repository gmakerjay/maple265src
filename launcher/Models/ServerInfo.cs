using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace v232.Launcher.WPF.Models
{
    /// <summary>
    /// Build-time branding / endpoint values, read from server_info.txt and launcher.ini.
    /// Supports dynamic LAN / Remote IP loading from launcher.ini.
    /// </summary>
    public static class ServerInfo
    {
        public const string ResourceName = "server_info.txt";

        public static string Ip = "127.0.0.1";
        public static string LauncherName = "GMS265";
        public static string Slogan = "GMS-V-265-Private Server";
        public static string Tagline = "Every hero begins as a dot on the grid.";
        public static string LaunchPanel = "CLAXON TERMINAL";
        public static string LaunchDescription = "Launches MapleStory.exe with an authentication token and injects the authhook.";
        public static string FooterText = "Modified from the V232 Swordie-Launcher";

        public static int ApiPort = 8483;
        public static int LoginPort = 8484;
        public static string HookDll = "Localhost.dll";
        public static string SavedUsername = "admin";

        static ServerInfo()
        {
            Reload();
        }

        /// <summary>Re-reads embedded server_info.txt and merges with launcher.ini if present.</summary>
        public static void Reload()
        {
            try
            {
                string text = ReadResource();
                if (!string.IsNullOrEmpty(text))
                {
                    var values = Parse(text);
                    if (values.Count > 0)
                    {
                        Ip = Get(values, "ip", Ip);
                        LauncherName = Get(values, "launcher name", Get(values, "launchername", LauncherName));
                        Slogan = Get(values, "slogan", Slogan);
                        Tagline = Get(values, "tagline", Tagline);
                        LaunchPanel = Get(values, "launch panel", LaunchPanel);
                        LaunchDescription = Get(values, "launch description", LaunchDescription);
                        FooterText = Get(values, "footer text", Get(values, "footer", FooterText));
                    }
                }
            }
            catch
            {
                // Keep the built-in defaults if the resource is missing or malformed.
            }

            // Load local overrides from launcher.ini (LAN / Localhost / Remote support)
            LoadFromLauncherIni();
        }

        public static string GetIniPath()
        {
            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            string iniPath = Path.Combine(baseDir, "launcher.ini");
            if (File.Exists(iniPath)) return iniPath;

            string curDir = Directory.GetCurrentDirectory();
            string curIni = Path.Combine(curDir, "launcher.ini");
            if (File.Exists(curIni)) return curIni;

            return Path.Combine(baseDir, "launcher.ini");
        }

        private static void LoadFromLauncherIni()
        {
            try
            {
                string path = GetIniPath();
                if (!File.Exists(path)) return;

                string[] lines = File.ReadAllLines(path);
                foreach (string raw in lines)
                {
                    string line = raw.Trim();
                    if (string.IsNullOrEmpty(line) || line.StartsWith("#") || line.StartsWith(";")) continue;

                    int eq = line.IndexOf('=');
                    if (eq <= 0) continue;

                    string key = line.Substring(0, eq).Trim();
                    string val = line.Substring(eq + 1).Trim();

                    if (key.Equals("IP", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(val))
                    {
                        Ip = val;
                    }
                    else if (key.Equals("Port", StringComparison.OrdinalIgnoreCase) && int.TryParse(val, out int lp))
                    {
                        LoginPort = lp;
                    }
                    else if (key.Equals("ApiPort", StringComparison.OrdinalIgnoreCase) && int.TryParse(val, out int ap))
                    {
                        ApiPort = ap;
                    }
                    else if (key.Equals("Dll", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(val))
                    {
                        HookDll = val;
                    }
                    else if (key.Equals("Username", StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(val))
                    {
                        SavedUsername = val;
                    }
                }
            }
            catch { }
        }

        /// <summary>Saves network configuration to launcher.ini so both Launcher and Localhost.dll share it.</summary>
        public static void SaveIni(string newIp, int apiPort = 0, int loginPort = 0, string username = null)
        {
            try
            {
                if (!string.IsNullOrEmpty(newIp)) Ip = newIp.Trim();
                if (apiPort > 0) ApiPort = apiPort;
                if (loginPort > 0) LoginPort = loginPort;
                if (!string.IsNullOrEmpty(username)) SavedUsername = username.Trim();

                string path = GetIniPath();
                List<string> lines = new List<string>();
                bool hasIp = false, hasPort = false, hasApiPort = false, hasDll = false;

                if (File.Exists(path))
                {
                    foreach (string raw in File.ReadAllLines(path))
                    {
                        string line = raw.Trim();
                        if (line.StartsWith("IP=", StringComparison.OrdinalIgnoreCase))
                        {
                            lines.Add("IP=" + Ip);
                            hasIp = true;
                        }
                        else if (line.StartsWith("Port=", StringComparison.OrdinalIgnoreCase))
                        {
                            lines.Add("Port=" + LoginPort);
                            hasPort = true;
                        }
                        else if (line.StartsWith("ApiPort=", StringComparison.OrdinalIgnoreCase))
                        {
                            lines.Add("ApiPort=" + ApiPort);
                            hasApiPort = true;
                        }
                        else if (line.StartsWith("Dll=", StringComparison.OrdinalIgnoreCase))
                        {
                            lines.Add("Dll=" + HookDll);
                            hasDll = true;
                        }
                        else
                        {
                            lines.Add(raw);
                        }
                    }
                }

                if (lines.Count == 0)
                {
                    lines.Add("[Server]");
                    lines.Add("IP=" + Ip);
                    lines.Add("Port=" + LoginPort);
                    lines.Add("ApiPort=" + ApiPort);
                    lines.Add("");
                    lines.Add("[Client]");
                    lines.Add("Exe=MapleStory.exe");
                    lines.Add("Dll=" + HookDll);
                    lines.Add("");
                    lines.Add("[Account]");
                    lines.Add("AutoLogin=1");
                    lines.Add("Username=" + SavedUsername);
                    lines.Add("Password=admin");
                    lines.Add("UserID=1");
                }
                else
                {
                    if (!hasIp) lines.Add("IP=" + Ip);
                    if (!hasPort) lines.Add("Port=" + LoginPort);
                    if (!hasApiPort) lines.Add("ApiPort=" + ApiPort);
                    if (!hasDll) lines.Add("Dll=" + HookDll);
                }

                File.WriteAllLines(path, lines);
            }
            catch { }
        }

        /// <summary>Launcher title, e.g. "GMS265 Launcher".</summary>
        public static string WindowTitle
        {
            get { return LauncherName + " Launcher"; }
        }

        /// <summary>File-system safe variant of the launcher name, used for config folders.</summary>
        public static string SafeName
        {
            get
            {
                var clean = new System.Text.StringBuilder(LauncherName.Length);
                foreach (char c in LauncherName)
                {
                    if (char.IsLetterOrDigit(c) || c == '_' || c == '-') clean.Append(c);
                }
                return clean.Length == 0 ? "Launcher" : clean.ToString();
            }
        }

        private static string Get(Dictionary<string, string> values, string key, string fallback)
        {
            string value;
            return values.TryGetValue(key, out value) && !string.IsNullOrEmpty(value) ? value : fallback;
        }

        private static Dictionary<string, string> Parse(string text)
        {
            var values = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            foreach (string raw in text.Split('\n'))
            {
                string line = raw.Trim();
                if (line.Length == 0) continue;
                if (line.StartsWith("#") || line.StartsWith("//")) continue;

                int split = line.IndexOf(':');
                if (split <= 0) continue;

                string key = line.Substring(0, split).Trim();
                string value = line.Substring(split + 1).Trim();
                if (key.Length == 0 || value.Length == 0) continue;

                values[key] = value;
            }
            return values;
        }

        private static string ReadResource()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            using (Stream stream = assembly.GetManifestResourceStream(ResourceName))
            {
                if (stream == null)
                {
                    foreach (string candidate in assembly.GetManifestResourceNames())
                    {
                        if (!candidate.EndsWith(ResourceName, StringComparison.OrdinalIgnoreCase)) continue;
                        using (Stream fallback = assembly.GetManifestResourceStream(candidate))
                        using (var reader = new StreamReader(fallback))
                        {
                            return reader.ReadToEnd();
                        }
                    }
                    return null;
                }

                using (var reader = new StreamReader(stream))
                {
                    return reader.ReadToEnd();
                }
            }
        }
    }
}
