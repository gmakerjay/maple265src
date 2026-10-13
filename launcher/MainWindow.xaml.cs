using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Threading;
using WpfAnimatedGif;
using v232.Launcher.WPF.Models;
using v232.Launcher.WPF.Services;

namespace v232.Launcher.WPF
{
    public partial class MainWindow : Window
    {
        private bool _isOnline = false;
        private Client _client;
        private LoginService _loginService;
        private RegisterService _registerService;

        private bool _isLoggedIn = false;
        private string _currentUser = "";
        private bool _isVioletPalette = false;
        private string _bgMode = "bg";
        private string _currentPage = "home";

        private static readonly string ConfigFolder = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData),
            ServerInfo.SafeName + "Launcher");
        private static readonly string ThemeConfigPath = Path.Combine(ConfigFolder, "theme.cfg");
        private static readonly string UserConfigPath = Path.Combine(ConfigFolder, "user.cfg");
        private static readonly string BgmConfigPath = Path.Combine(ConfigFolder, "bgm.cfg");
        private static readonly string BgConfigPath = Path.Combine(ConfigFolder, "bg.cfg");

        private MediaElement _bgmPlayer;
        private bool _isBgmPlaying = true;
        private double _bgmVolume = 0.5;
        private string _bgmTempPath;

        private readonly List<System.Windows.Shapes.Ellipse> _particles = new List<System.Windows.Shapes.Ellipse>();
        private readonly List<double> _particleX = new List<double>();
        private readonly List<double> _particleY = new List<double>();
        private readonly List<double> _particleVx = new List<double>();
        private readonly List<double> _particleVy = new List<double>();
        private readonly List<float> _particlePhase = new List<float>();
        private DispatcherTimer _particleTimer;
        private Random _rng = new Random();

        public MainWindow()
        {
            InitializeComponent();
            _registerService = new RegisterService();

            ApplyServerInfo();
            LoadPalettePreference();
            ApplyPalette(_isVioletPalette);
            LoadBgPreference();

            WirePages();

            InitializeConnection();
            Loaded += MainWindow_Loaded;
        }

        /// <summary>Version shown in the footer, taken from the assembly.</summary>
        private static string LauncherVersion
        {
            get
            {
                try
                {
                    System.Version v = Assembly.GetExecutingAssembly().GetName().Version;                    return "v" + v.ToString(4);
                }
                catch
                {
                    return "v1.0.0.22";
                }
            }
        }

        /// <summary>
        /// Pushes the values from server_info.txt into the shell (title, brand, slogan).
        /// </summary>
        private void ApplyServerInfo()
        {
            try
            {
                ServerInfo.Reload();

                Title = ServerInfo.WindowTitle;
                BrandNameText.Text = ServerInfo.LauncherName;
                LoadingBrandText.Text = ServerInfo.LauncherName;
                FooterVersionText.Text = LauncherVersion;
                FooterInfoText.Text = ServerInfo.FooterText;

                HomePageView.SetEndpointInfo(ServerInfo.Ip, ServerInfo.ApiPort, ServerInfo.LoginPort);
                HomePageView.SetSlogan(ServerInfo.Slogan);
                HomePageView.SetBranding(ServerInfo.LauncherName, ServerInfo.Tagline);
                PlayPageView.SetEndpointInfo(ServerInfo.Ip, ServerInfo.ApiPort, ServerInfo.LoginPort);
                PlayPageView.SetLaunchInfo(ServerInfo.LaunchPanel, ServerInfo.LaunchDescription);
            }
            catch (Exception ex)
            {
                Log("server_info failed: " + ex.Message);
            }
        }

        private async void BootGifBackground()
        {
            try
            {
                ImageBehavior.SetAnimatedSource(GifBackground, null);
                GifBackground.Source = null;

                if (_bgMode == "off")
                {
                    GifBackground.Visibility = Visibility.Collapsed;
                }
                else
                {
                    GifBackground.Visibility = Visibility.Visible;
                    var img = new BitmapImage();
                    img.BeginInit();
                    img.UriSource = new Uri("pack://application:,,,/Assets/" + (_bgMode == "bg2" ? "bg2.gif" : "bg.gif"));
                    img.CacheOption = BitmapCacheOption.OnLoad;
                    img.EndInit();
                    ImageBehavior.SetAnimatedSource(GifBackground, img);
                }
            }
            catch { }

            await Task.Delay(150);
            CollectFrames();
        }

        private static void CollectFrames()
        {
            for (int i = 0; i < 2; i++)
            {
                GC.Collect(2, GCCollectionMode.Forced, true);
                GC.WaitForPendingFinalizers();
            }
            GC.Collect(2, GCCollectionMode.Forced, true);
        }

        private void LoadBgPreference()
        {
            try
            {
                if (File.Exists(BgConfigPath))
                {
                    string v = File.ReadAllText(BgConfigPath).Trim();
                    if (v == "bg" || v == "bg2" || v == "off") _bgMode = v;
                }
            }
            catch { }
        }

        private void SaveBgPreference()
        {
            try
            {
                if (!Directory.Exists(ConfigFolder)) Directory.CreateDirectory(ConfigFolder);
                File.WriteAllText(BgConfigPath, _bgMode);
            }
            catch { }
        }

        private void OnBackgroundSelected(string mode)
        {
            if (mode != "bg" && mode != "bg2" && mode != "off") return;
            _bgMode = mode;
            SaveBgPreference();
            BootGifBackground();
        }

        private void WirePages()
        {
            HomePageView.PlayRequested += (s, e) => OnPlayRequested();
            PlayPageView.LaunchRequested += (s, e) => OnLaunchRequested();
            PlayPageView.LogoutRequested += (s, e) => OnLogout();
            AccountPageView.LoginSubmitRequested += (s, e) => OnLoginSubmit();
            AccountPageView.RegisterSubmitRequested += (s, e) => OnRegisterSubmit();
            AccountPageView.LogoutRequested += (s, e) => OnLogout();
        }

        #region Boot

        private async void MainWindow_Loaded(object sender, RoutedEventArgs e)
        {
            ClientDir_Scan();

            LoadSavedUsername();
            InitializeBgm();

            SyncGearUi();

            StartParticles();
            BootGifBackground();

            var fadeOut = new DoubleAnimation { From = 1, To = 0, Duration = TimeSpan.FromMilliseconds(450) };
            fadeOut.Completed += (s, a) => LoadingOverlay.Visibility = Visibility.Collapsed;
            LoadingOverlay.BeginAnimation(OpacityProperty, fadeOut);
        }

        private void ClientDir_Scan()
        {
            string dir = AppDomain.CurrentDomain.BaseDirectory;
            string hookDll = LoginService.DetectHookDll(dir);
            bool ok = File.Exists(Path.Combine(dir, "MapleStory.exe")) &&
                      File.Exists(Path.Combine(dir, hookDll));
            HomePageView.SetClientOk(ok);
            PlayPageView.SetClientReadouts(dir);
        }

        #endregion

        #region Server Connection

        private async void InitializeConnection()
        {
            await Task.Run(() =>
            {
                try
                {
                    _client = new Client();
                    _isOnline = _client.Connect();
                }
                catch
                {
                    _isOnline = false;
                }
            });

            Dispatcher.Invoke(() => UpdateServerStatus(_isOnline));
        }

        public void UpdateServerStatus(bool isOnline)
        {
            _isOnline = isOnline;
            StatusDot.Fill = (Brush)FindResource(isOnline ? "SuccessBrush" : "ErrorBrush");
            StatusText.Text = isOnline ? "ONLINE" : "OFFLINE";
            StatusText.Foreground = (Brush)FindResource(isOnline ? "SuccessBrush" : "ErrorBrush");
            HomePageView.SetServerOnline(isOnline);
        }

        #endregion

        #region Window Controls

        private void Header_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ClickCount == 1) DragMove();
        }

        private void Brand_MouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ClickCount == 1) DragMove();
        }

        private void MinimizeButton_Click(object sender, RoutedEventArgs e)
        {
            WindowState = WindowState.Minimized;
        }

        private void CloseButton_Click(object sender, RoutedEventArgs e)
        {
            _client?.Disconnect();
            Application.Current.Shutdown();
        }

        #endregion

        #region Navigation

        private void NavButton_Click(object sender, RoutedEventArgs e)
        {
            if (sender is Button btn && btn.Tag is string page)
            {
                NavigateTo(page);
            }
        }

        private void NavigateTo(string page)
        {
            if (page == _currentPage) return;
            _currentPage = page;
            SetNavSelection(page);
            CloseGearPopup();

            HomePageView.Visibility = Visibility.Collapsed;
            PlayPageView.Visibility = Visibility.Collapsed;
            AccountPageView.Visibility = Visibility.Collapsed;

            FrameworkElement target = HomePageView;
            switch (page)
            {
                case "play":
                    target = PlayPageView;
                    break;
                case "account":
                    target = AccountPageView;
                    break;
                default:
                    target = HomePageView;
                    break;
            }

            target.Visibility = Visibility.Visible;
            target.Opacity = 0;
            var fadeIn = new DoubleAnimation { From = 0, To = 1, Duration = TimeSpan.FromMilliseconds(220) };
            target.BeginAnimation(OpacityProperty, fadeIn);

            if (target == HomePageView && _isLoggedIn)
            {
                var _ = RefreshAccountData();
            }
        }

        private void SetNavSelection(string page)
        {
            SetItem(page == "home", NavIndicatorHome, NavLabelHome);
            SetItem(page == "play", NavIndicatorPlay, NavLabelPlay);
            SetItem(page == "account", NavIndicatorAccount, NavLabelAccount);
        }

        private void SetItem(bool selected, System.Windows.Shapes.Rectangle indicator, TextBlock label)
        {
            indicator.Visibility = selected ? Visibility.Visible : Visibility.Collapsed;
            label.Foreground = (Brush)FindResource(selected ? "PrimaryAccentBrush" : "TextSecondaryBrush");
        }

        private void OnPlayRequested()
        {
            if (_isLoggedIn) NavigateTo("play");
            else NavigateTo("account");
        }

        #endregion

        #region Palette

        private void LoadPalettePreference()
        {
            try
            {
                if (File.Exists(ThemeConfigPath))
                {
                    _isVioletPalette = File.ReadAllText(ThemeConfigPath).Trim() == "violet";
                }
            }
            catch { }
        }

        private void SavePalettePreference()
        {
            try
            {
                if (!Directory.Exists(ConfigFolder)) Directory.CreateDirectory(ConfigFolder);
                File.WriteAllText(ThemeConfigPath, _isVioletPalette ? "violet" : "cyan");
            }
            catch { }
        }

        private void ApplyPalette(bool violet)
        {
            _isVioletPalette = violet;
            var resources = Application.Current.Resources.MergedDictionaries;
            for (int i = 0; i < resources.Count; i++)
            {
                string src = resources[i].Source != null ? resources[i].Source.OriginalString : "";
                if (!src.Contains("Palette")) continue;

                resources.RemoveAt(i);
                resources.Insert(i, new ResourceDictionary
                {
                    Source = new Uri("Themes/" + (violet ? "PaletteViolet.xaml" : "PaletteCyan.xaml"), UriKind.Relative)
                });
                break;
            }
            SavePalettePreference();
        }

        #endregion

        #region Remember Me

        private void LoadSavedUsername()
        {
            try
            {
                if (File.Exists(UserConfigPath))
                {
                    string saved = File.ReadAllText(UserConfigPath).Trim();
                    if (!string.IsNullOrEmpty(saved))
                    {
                        AccountPageView.LoginUsername.Text = saved;
                        AccountPageView.LoginRemember.IsChecked = true;
                        AccountPageView.LoginPassword.Focus();
                    }
                }
                else if (!string.IsNullOrEmpty(ServerInfo.SavedUsername))
                {
                    AccountPageView.LoginUsername.Text = ServerInfo.SavedUsername;
                    AccountPageView.LoginRemember.IsChecked = true;
                    AccountPageView.LoginPassword.Focus();
                }
            }
            catch { }
        }

        private void SaveUsername()
        {
            try
            {
                if (!Directory.Exists(ConfigFolder)) Directory.CreateDirectory(ConfigFolder);

                if (AccountPageView.LoginRemember.IsChecked == true)
                    File.WriteAllText(UserConfigPath, AccountPageView.LoginUsername.Text.Trim());
                else if (File.Exists(UserConfigPath))
                    File.Delete(UserConfigPath);
            }
            catch { }
        }

        #endregion

        #region Login

        private async void OnLoginSubmit()
        {
            string username = AccountPageView.LoginUsername.Text.Trim();
            string password = AccountPageView.LoginPassword.Password;

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Please enter both username and password.", "Login Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (!_isOnline)
            {
                MessageBox.Show("Cannot connect to server. Please check your connection.", "Connection Error", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            AccountPageView.SetLoginBusy(true, "AUTHENTICATING...");

            try
            {
                _loginService = new LoginService(username, password);
                _loginService.CClient = _client;

                bool success = await _loginService.Authenticate();

                if (success)
                {
                    _currentUser = username;
                    _isLoggedIn = true;
                    SaveUsername();
                    AccountPageView.LoginPassword.Password = "";
                    AccountPageView.ShowLoggedInPanel(username);
                    HomePageView.SetSignedIn(true, username);
                    PlayPageView.SetSignedIn(true, username);
                    NavigateTo("home");
                    await RefreshAccountData();
                }
                else
                {
                    AccountPageView.ShowLoginForm();
                    string reason = "Invalid username or password.";
                    if (_loginService != null)
                    {
                        switch (_loginService.LastAuthResult)
                        {
                            case 2:
                                reason = "Too many login attempts. Please wait a moment and try again.";
                                break;
                            case 3:
                                reason = "Game version mismatch between client and server.";
                                break;
                            case 4:
                                reason = "Cannot reach server API. Please check server IP / port.";
                                break;
                            case 5:
                                reason = "This account has been banned.";
                                break;
                            case 6:
                                reason = "Account is already logged in elsewhere.";
                                break;
                        }
                    }
                    MessageBox.Show(reason, "Login Failed", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Login error: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            finally
            {
                AccountPageView.SetLoginBusy(false, null);
            }
        }

        #endregion

        #region Register

        private async void OnRegisterSubmit()
        {
            string username = AccountPageView.RegisterUsername.Text.Trim();
            string email = AccountPageView.RegisterEmail.Text.Trim();
            string password = AccountPageView.RegisterPassword.Password;
            string confirm = AccountPageView.RegisterConfirmPassword.Password;

            int validation = _registerService.HandleSignUpInput(username, password, confirm, email);
            if (validation != 0)
            {
                MessageBox.Show(_registerService.GetErrorMessage(validation), "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (!_isOnline)
            {
                MessageBox.Show("Cannot connect to server. Please check your connection.", "Connection Error", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            AccountPageView.SetRegisterBusy(true, "SYNCING IDENTITY...");

            try
            {
                var result = await _registerService.CreateAccount(username, password, email, _client);

                if (result.success)
                {
                    MessageBox.Show(result.message, "Success", MessageBoxButton.OK, MessageBoxImage.Information);

                    AccountPageView.RegisterUsername.Text = "";
                    AccountPageView.RegisterEmail.Text = "";
                    AccountPageView.RegisterPassword.Password = "";
                    AccountPageView.RegisterConfirmPassword.Password = "";

                    AccountPageView.LoginUsername.Text = username;
                    AccountPageView.ShowLoginForm();
                }
                else
                {
                    MessageBox.Show(result.message, "Registration Failed", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Registration error: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            finally
            {
                AccountPageView.SetRegisterBusy(false, null);
            }
        }

        #endregion

        #region Play / Logout

        private void OnLaunchRequested()
        {
            if (_loginService == null || !_loginService.Auth)
            {
                MessageBox.Show("Please login first.", "Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                NavigateTo("account");
                return;
            }

            try
            {
                bool launched = _loginService.LaunchMaple();
                if (launched)
                {
                    MessageBox.Show("Game launched.", ServerInfo.WindowTitle, MessageBoxButton.OK, MessageBoxImage.Information);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Failed to launch game: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void OnLogout()
        {
            _loginService = null;
            _isLoggedIn = false;
            _currentUser = "";
            AccountPageView.LoginUsername.Text = _currentUser;
            AccountPageView.LoginPassword.Password = "";
            AccountPageView.ShowLoginForm();
            HomePageView.SetSignedIn(false, null);
            PlayPageView.SetSignedIn(false, null);
            NavigateTo("account");
        }

        /// <summary>
        /// Pulls the account overview (cash balances + top 3 characters by level)
        /// from the API using the current auth token.
        /// </summary>
        private async Task RefreshAccountData()
        {
            if (_loginService == null || !_loginService.Auth) return;

            try
            {
                if (_client == null || !_client.IsConnected())
                {
                    _client = new Client();
                    if (!_client.Connect())
                    {
                        HomePageView.SetAccountData(null);
                        return;
                    }
                }

                var snapshot = await Handlers.SendAccountDataRequest((int)_loginService.Token, _client);
                HomePageView.SetAccountData(snapshot);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Account data failed: " + ex.Message);
                HomePageView.SetAccountData(null);
            }
        }

        #endregion

        #region Audio

        private void InitializeBgm()
        {
            // Wire the player first so the gear toggle always has a target.
            _bgmPlayer = BgmPlayer;

            try
            {
                LoadBgmPreferences();

                var resourceUri = new Uri("pack://application:,,,/Assets/bgm.mp3");
                var resourceStream = Application.GetResourceStream(resourceUri);
                if (resourceStream == null)
                {
                    Log("bgm resource not found: " + resourceUri);
                    UpdateGearIcon();
                    return;
                }

                // Unique per process: MediaElement keeps the file locked while playing,
                // so a shared name breaks a second launcher instance.
                _bgmTempPath = Path.Combine(Path.GetTempPath(), ServerInfo.SafeName + "_bgm_" + System.Diagnostics.Process.GetCurrentProcess().Id + ".mp3");
                using (var fs = new FileStream(_bgmTempPath, FileMode.Create, FileAccess.Write))
                {
                    resourceStream.Stream.CopyTo(fs);
                }

                _bgmPlayer.Source = new Uri(_bgmTempPath);
                _bgmPlayer.Volume = _bgmVolume;
                if (_isBgmPlaying) _bgmPlayer.Play();
                UpdateGearIcon();
            }
            catch (Exception ex)
            {
                Log("bgm init failed: " + ex.Message);
            }
        }

        private static void Log(string message)
        {
            try
            {
                if (!Directory.Exists(ConfigFolder)) Directory.CreateDirectory(ConfigFolder);
                File.AppendAllText(Path.Combine(ConfigFolder, "launcher.log"),
                    DateTime.Now.ToString("HH:mm:ss") + " " + message + Environment.NewLine);
            }
            catch { }
        }

        private void LoadBgmPreferences()
        {
            try
            {
                if (File.Exists(BgmConfigPath))
                {
                    foreach (string line in File.ReadAllLines(BgmConfigPath))
                    {
                        if (line.StartsWith("volume="))
                        {
                            if (double.TryParse(line.Substring(7), out double vol))
                            {
                                _bgmVolume = Math.Max(0, Math.Min(1, vol));
                            }
                        }
                        else if (line.StartsWith("playing="))
                        {
                            _isBgmPlaying = line.Substring(8) == "true";
                        }
                    }
                }
                else
                {
                    _isBgmPlaying = true;
                    _bgmVolume = 0.5;
                }
            }
            catch
            {
                _isBgmPlaying = true;
                _bgmVolume = 0.5;
            }
        }

        private void SaveBgmPreferences()
        {
            try
            {
                if (!Directory.Exists(ConfigFolder)) Directory.CreateDirectory(ConfigFolder);
                File.WriteAllText(BgmConfigPath, $"volume={_bgmVolume:F2}\nplaying={(_isBgmPlaying ? "true" : "false")}");
            }
            catch { }
        }

        private void OnBgmToggleRequested()
        {
            if (_bgmPlayer == null) return;
            if (_bgmPlayer.Source == null) Log("bgm toggle ignored: no media source");

            try
            {
                if (_isBgmPlaying)
                {
                    _bgmPlayer.Pause();
                    _isBgmPlaying = false;
                }
                else
                {
                    _bgmPlayer.Volume = _bgmVolume;
                    _bgmPlayer.Play();
                    _isBgmPlaying = true;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Bgm toggle failed: " + ex.Message);
            }

            UpdateGearIcon();
            SaveBgmPreferences();
        }

        private void UpdateGearIcon()
        {
            GearIcon.Fill = (Brush)FindResource(_isBgmPlaying ? "PrimaryAccentBrush" : "TextMutedBrush");
        }

        private void OnVolumeChanged(double v)
        {
            _bgmVolume = Math.Max(0, Math.Min(1, v));
            if (_bgmPlayer != null) _bgmPlayer.Volume = _bgmVolume;
            SaveBgmPreferences();
        }

        #region Gear Popup

        private void GearButton_Click(object sender, RoutedEventArgs e)
        {
            if (GearPopup.Visibility == Visibility.Visible) CloseGearPopup();
            else OpenGearPopup();
        }

        private void OpenGearPopup()
        {
            SyncGearUi();
            GearPopup.Visibility = Visibility.Visible;
            GearPopup.Opacity = 0;
            var fadeIn = new DoubleAnimation { From = 0, To = 1, Duration = TimeSpan.FromMilliseconds(160) };
            GearPopup.BeginAnimation(OpacityProperty, fadeIn);
        }

        private void CloseGearPopup()
        {
            GearPopup.Visibility = Visibility.Collapsed;
        }

        private void GearPopupClose_Click(object sender, RoutedEventArgs e)
        {
            CloseGearPopup();
        }

        private void SyncGearUi()
        {
            GearVolumeSlider.Value = _bgmVolume;
            GearVolumeLabel.Text = ((int)(_bgmVolume * 100)) + "%";
            GearSoundText.Text = _isBgmPlaying ? "SOUND ON" : "SOUND OFF";
            GearSoundIcon.Data = _isBgmPlaying
                ? Geometry.Parse("M4,8 L9,8 L14,4 L14,18 L9,14 L4,14 Z")
                : Geometry.Parse("M4,8 L9,8 L14,4 L14,18 L9,14 L4,14 Z M16,7 L21,13 M21,7 L16,13");

            GearServerIpBox.Text = ServerInfo.Ip;

            StyleGearChip(GearCyanChip, !_isVioletPalette);
            StyleGearChip(GearVioletChip, _isVioletPalette);
            StyleGearChip(GearBgMotionChip, _bgMode == "bg");
            StyleGearChip(GearBgCineChip, _bgMode == "bg2");
            StyleGearChip(GearBgOffChip, _bgMode == "off");
        }

        private void StyleGearChip(Button chip, bool selected)
        {
            chip.Foreground = (Brush)FindResource(selected ? "TextPrimaryBrush" : "TextMutedBrush");
            chip.BorderBrush = (Brush)FindResource(selected ? "PrimaryAccentBrush" : "BorderBrush");
            chip.Background = (Brush)FindResource(selected ? "BackgroundHoverBrush" : "GlassFillBrush");
        }

        private void GearSoundButton_Click(object sender, RoutedEventArgs e)
        {
            OnBgmToggleRequested();
            SyncGearUi();
        }

        private void GearVolumeSlider_ValueChanged(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            if (GearVolumeLabel == null) return;
            GearVolumeLabel.Text = ((int)(e.NewValue * 100)) + "%";
            if (e.OriginalSource != null) OnVolumeChanged(e.NewValue);
        }

        private void GearCyanChip_Click(object sender, RoutedEventArgs e)
        {
            ApplyPalette(false);
            SyncGearUi();
        }

        private void GearVioletChip_Click(object sender, RoutedEventArgs e)
        {
            ApplyPalette(true);
            SyncGearUi();
        }

        private void GearBgMotion_Click(object sender, RoutedEventArgs e)
        {
            OnBackgroundSelected("bg");
            SyncGearUi();
        }

        private void GearBgCine_Click(object sender, RoutedEventArgs e)
        {
            OnBackgroundSelected("bg2");
            SyncGearUi();
        }

        private void GearBgOff_Click(object sender, RoutedEventArgs e)
        {
            OnBackgroundSelected("off");
            SyncGearUi();
        }

        private void GearApplyIp_Click(object sender, RoutedEventArgs e)
        {
            string newIp = GearServerIpBox.Text.Trim();
            if (string.IsNullOrEmpty(newIp))
            {
                MessageBox.Show("Please enter a valid IP address.", "Input Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            ServerInfo.SaveIni(newIp);
            ApplyServerInfo();

            ClientDir_Scan();
            InitializeConnection();

            MessageBox.Show($"Server IP updated to: {newIp}\nSaved to launcher.ini successfully!", "Network Configuration", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        #endregion

        #endregion

        #region Particles

        private void StartParticles()
        {
            double w = RootShell.ActualWidth;
            double h = RootShell.ActualHeight;
            if (w <= 0 || h <= 0) return;

            var fills = new[] { (Brush)FindResource("PrimaryAccentBrush"), (Brush)FindResource("SecondaryAccentBrush"), (Brush)FindResource("TextMutedBrush") };

            for (int i = 0; i < 46; i++)
            {
                double size = 1 + _rng.NextDouble() * 2.2;
                var dot = new System.Windows.Shapes.Ellipse
                {
                    Width = size,
                    Height = size,
                    Fill = fills[_rng.Next(fills.Length)],
                    Opacity = 0.15 + _rng.NextDouble() * 0.45
                };
                double x = _rng.NextDouble() * w;
                double y = _rng.NextDouble() * h;
                Canvas.SetLeft(dot, x);
                Canvas.SetTop(dot, y);
                ParticleLayer.Children.Add(dot);

                _particles.Add(dot);
                _particleX.Add(x);
                _particleY.Add(y);
                _particleVx.Add((_rng.NextDouble() - 0.5) * 0.4);
                _particleVy.Add(-(_rng.NextDouble() * 0.5 + 0.1));
                _particlePhase.Add((float)(_rng.NextDouble() * Math.PI * 2));
            }

            _particleTimer = new DispatcherTimer { Interval = TimeSpan.FromMilliseconds(30) };
            _particleTimer.Tick += (s, e) =>
            {
                for (int i = 0; i < _particles.Count; i++)
                {
                    _particlePhase[i] += 0.06f;
                    double sway = Math.Sin(_particlePhase[i]) * 0.25;
                    double nx = _particleX[i] + _particleVx[i] + sway;
                    double ny = _particleY[i] + _particleVy[i];
                    if (nx < -4) nx = w + 4;
                    if (nx > w + 4) nx = -4;
                    if (ny < -4) ny = h + 4;

                    _particleX[i] = nx;
                    _particleY[i] = ny;
                    Canvas.SetLeft(_particles[i], nx);
                    Canvas.SetTop(_particles[i], ny);
                }
            };
            _particleTimer.Start();
        }

        #endregion

        #region Credits

        private void CreditsButton_Click(object sender, MouseButtonEventArgs e)
        {
            CreditsPopup.Visibility = Visibility.Visible;
        }

        private void CloseCredits_Click(object sender, RoutedEventArgs e)
        {
            CreditsPopup.Visibility = Visibility.Collapsed;
        }

        #endregion
    }
}