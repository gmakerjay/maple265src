using System;
using System.IO;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using v232.Launcher.WPF.Services;

namespace v232.Launcher.WPF.Views
{
    public partial class PlayPage : UserControl
    {
        public event EventHandler LaunchRequested;
        public event EventHandler LogoutRequested;

        public PlayPage()
        {
            InitializeComponent();
            LaunchButton.Click += (s, e) => LaunchRequested?.Invoke(this, EventArgs.Empty);
            LogoutButton.Click += (s, e) => LogoutRequested?.Invoke(this, EventArgs.Empty);
        }

        public void SetSignedIn(bool signedIn, string username)
        {
            if (signedIn)
            {
                SignedInText.Text = "SIGNED IN · " + username.ToUpperInvariant();
                SignedInText.Foreground = (Brush)FindResource("SuccessBrush");
            }
            else
            {
                SignedInText.Text = "NOT SIGNED IN";
                SignedInText.Foreground = (Brush)FindResource("WarningBrush");
            }
        }

        public void SetClientReadouts(string clientDir)
        {
            ReadoutClientDir.Text = clientDir;
            bool hasExe = File.Exists(Path.Combine(clientDir, "MapleStory.exe"));
            string hookDll = LoginService.DetectHookDll(clientDir);
            bool hasHook = File.Exists(Path.Combine(clientDir, hookDll));

            ReadoutExe.Text = hasExe ? "PRESENT" : "MISSING";
            ReadoutExe.Foreground = (Brush)FindResource(hasExe ? "SuccessBrush" : "ErrorBrush");
            ReadoutHookLabel.Text = $"AUTHHOOK ({hookDll})";
            ReadoutHook.Text = hasHook ? "PRESENT" : "MISSING";
            ReadoutHook.Foreground = (Brush)FindResource(hasHook ? "SuccessBrush" : "ErrorBrush");

            LaunchStatusText.Text = (hasExe && hasHook) ? "READY" : "CLIENT INCOMPLETE";
            LaunchStatusDot.Fill = (Brush)FindResource((hasExe && hasHook) ? "SuccessBrush" : "ErrorBrush");
        }

        /// <summary>Endpoint readouts, fed from server_info.txt.</summary>
        public void SetEndpointInfo(string ip, int apiPort, int loginPort)
        {
            ReadoutApiEndpoint.Text = ip + " : " + apiPort;
            ReadoutLoginPort.Text = loginPort.ToString();
        }

        /// <summary>Panel title and description, fed from server_info.txt.</summary>
        public void SetLaunchInfo(string panelTitle, string description)
        {
            LaunchPanelTitle.Text = panelTitle;
            LaunchDescriptionText.Text = description;
        }
    }
}