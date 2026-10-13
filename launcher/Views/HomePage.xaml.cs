using System;
using System.Globalization;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Threading;
using v232.Launcher.WPF.Models;

namespace v232.Launcher.WPF.Views
{
    public partial class HomePage : UserControl
    {
        private readonly DispatcherTimer _radarTimer;
        private double _sweepAngle;
        private bool _scannedOnce;

        public event EventHandler PlayRequested;

        public HomePage()
        {
            InitializeComponent();
            PlayButton.Click += PlayButton_Click;
            RadarSweep.Fill = (Brush)FindResource("PrimaryAccentBrush");
            RadarSweep.Stroke = (Brush)FindResource("SecondaryAccentBrush");
            RadarSweep.StrokeThickness = 1.5;

            _radarTimer = new DispatcherTimer { Interval = TimeSpan.FromMilliseconds(30) };
            _radarTimer.Tick += (s, e) =>
            {
                _sweepAngle += 2;
                if (_sweepAngle >= 359) _sweepAngle -= 360;
                RadarRotation.Angle = _sweepAngle;
                if (_scannedOnce && _sweepAngle == 0)
                {
                    RadarSweep.Fill = (Brush)FindResource("PrimaryAccentBrush");
                }
            };
            _radarTimer.Start();
            Loaded += (s, e) => _scannedOnce = true;
        }

        /// <summary>Endpoint readouts, fed from server_info.txt.</summary>
        public void SetEndpointInfo(string ip, int apiPort, int loginPort)
        {
            ApiEndpointText.Text = "API : " + ip + " : " + apiPort;
            LoginEndpointText.Text = "LOGIN : " + ip + " : " + loginPort;
        }

        /// <summary>Header tagline, fed from server_info.txt.</summary>
        public void SetSlogan(string slogan)
        {
            SloganText.Text = slogan;
        }

        /// <summary>Hero name and tagline, fed from server_info.txt.</summary>
        public void SetBranding(string launcherName, string tagline)
        {
            BrandNameText.Text = launcherName;
            TaglineText.Text = tagline;
        }

        public void SetServerOnline(bool online)        {
            StatusDot.Fill = (Brush)FindResource(online ? "SuccessBrush" : "ErrorBrush");
            StatusText.Text = online ? "ONLINE" : "OFFLINE";
            StatusText.Foreground = (Brush)FindResource(online ? "SuccessBrush" : "ErrorBrush");
            ChannelText.Text = online ? "CHANNELS : 10" : "CHANNELS : --";
        }

        public void SetSignedIn(bool signedIn, string username)
        {
            AuthHint.Text = signedIn
                ? string.Format("Signed in as {0} — launch ready.", username)
                : "Not signed in — sign in to launch the game.";

            WalletOwner.Text = signedIn ? (username ?? string.Empty).ToUpperInvariant() : "NOT LINKED";
            if (!signedIn) ClearAccountData();
        }

        public void SetClientOk(bool ok)
        {
            ClientStatusText.Text = ok ? "READY" : "MISSING FILES";
            ClientStatusText.Foreground = (Brush)FindResource(ok ? "SuccessBrush" : "WarningBrush");
        }

        public void SetAccountData(AccountSnapshot snapshot)
        {
            if (snapshot == null || !snapshot.Success)
            {
                OperativesAccount.Text = "UNAVAILABLE";
                OperativesEmpty.Text = snapshot == null
                    ? "COULD NOT REACH THE CHARACTER SERVICE"
                    : "SESSION EXPIRED — SIGN IN AGAIN";
                OperativesEmpty.Visibility = Visibility.Visible;
                OperativesList.Visibility = Visibility.Collapsed;
                NxText.Text = DpText.Text = VpText.Text = "0";
                return;
            }

            NxText.Text = snapshot.Nx.ToString("N0", CultureInfo.InvariantCulture);
            DpText.Text = snapshot.Dp.ToString("N0", CultureInfo.InvariantCulture);
            VpText.Text = snapshot.Vp.ToString("N0", CultureInfo.InvariantCulture);

            if (snapshot.Characters.Count == 0)
            {
                OperativesEmpty.Text = "NO CHARACTERS ON THIS ACCOUNT YET";
                OperativesEmpty.Visibility = Visibility.Visible;
                OperativesList.Visibility = Visibility.Collapsed;
                return;
            }

            OperativesEmpty.Visibility = Visibility.Collapsed;
            OperativesList.Visibility = Visibility.Visible;

            var ranks = new[] { "01", "02", "03" };
            var rankBlocks = new[]
            {
                new TextBlock[] { Rank1, CharName1, CharJob1, CharLevel1 },
                new TextBlock[] { Rank2, CharName2, CharJob2, CharLevel2 },
                new TextBlock[] { Rank3, CharName3, CharJob3, CharLevel3 }
            };
            var rankRows = new[] { OperativeRow1, OperativeRow2, OperativeRow3 };

            for (int i = 0; i < rankBlocks.Length; i++)
            {
                var blocks = rankBlocks[i];
                bool filled = i < snapshot.Characters.Count;

                // Only render the rows the account actually has.
                rankRows[i].Visibility = filled ? Visibility.Visible : Visibility.Collapsed;
                if (i == rankBlocks.Length - 1)
                    rankRows[i].Margin = new Thickness(0);
                else
                    rankRows[i].Margin = new Thickness(0, 0, 0, 8);

                if (!filled)
                {
                    blocks[0].Text = ranks[i];
                    blocks[1].Text = "—";
                    blocks[2].Text = "";
                    blocks[3].Text = "";
                    continue;
                }

                var chr = snapshot.Characters[i];
                blocks[0].Text = ranks[i];
                blocks[1].Text = chr.Name;
                blocks[2].Text = string.IsNullOrEmpty(chr.JobName) ? ("JOB " + chr.Job) : chr.JobName;
                blocks[3].Text = "LV " + chr.Level;
            }

            OperativesAccount.Text = string.Format("{0} OPERATIVE{1}",
                snapshot.Characters.Count, snapshot.Characters.Count == 1 ? "" : "S");
        }

        private void ClearAccountData()
        {
            OperativesAccount.Text = "";
            OperativesEmpty.Text = "SIGN IN TO LOAD YOUR OPERATIVES";
            OperativesEmpty.Visibility = Visibility.Visible;
            OperativesList.Visibility = Visibility.Collapsed;
            OperativeRow1.Visibility = OperativeRow2.Visibility = OperativeRow3.Visibility = Visibility.Visible;
            NxText.Text = DpText.Text = VpText.Text = "0";
        }

        private void PlayButton_Click(object sender, RoutedEventArgs e)
        {
            PlayRequested?.Invoke(this, EventArgs.Empty);
        }
    }
}