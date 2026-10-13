using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using System.Windows.Navigation;

namespace v232.Launcher.WPF.Views
{
    public partial class AccountPage : UserControl
    {
        public event EventHandler LoginSubmitRequested;
        public event EventHandler RegisterSubmitRequested;
        public event EventHandler LogoutRequested;

        public AccountPage()
        {
            InitializeComponent();
            LoginSubmit.Click += (s, e) => LoginSubmitRequested?.Invoke(this, EventArgs.Empty);
            RegisterSubmit.Click += (s, e) => RegisterSubmitRequested?.Invoke(this, EventArgs.Empty);
            LogoutButton.Click += (s, e) => LogoutRequested?.Invoke(this, EventArgs.Empty);
        }

        private void ShowRegister_Click(object sender, RoutedEventArgs e)
        {
            LoginFormPanel.Visibility = Visibility.Collapsed;
            RegisterFormPanel.Visibility = Visibility.Visible;
            AccountPanel.Visibility = Visibility.Collapsed;
        }

        private void ShowLogin_Click(object sender, RoutedEventArgs e)
        {
            RegisterFormPanel.Visibility = Visibility.Collapsed;
            LoginFormPanel.Visibility = Visibility.Visible;
            AccountPanel.Visibility = Visibility.Collapsed;
        }

        public void ShowLoginForm()
        {
            LoginFormPanel.Visibility = Visibility.Visible;
            RegisterFormPanel.Visibility = Visibility.Collapsed;
            AccountPanel.Visibility = Visibility.Collapsed;
        }

        public void ShowRegisterForm()
        {
            RegisterFormPanel.Visibility = Visibility.Visible;
            LoginFormPanel.Visibility = Visibility.Collapsed;
            AccountPanel.Visibility = Visibility.Collapsed;
        }

        public void ShowLoggedInPanel(string username)
        {
            AccountPanel.Visibility = Visibility.Visible;
            LoginFormPanel.Visibility = Visibility.Collapsed;
            RegisterFormPanel.Visibility = Visibility.Collapsed;
            AccountUsername.Text = username;
            AvatarInitial.Text = username.Length > 0 ? username.Substring(0, 1).ToUpperInvariant() : "?";
        }

        public void SetLoginBusy(bool busy, string label)
        {
            LoginSubmit.IsEnabled = !busy;
            if (busy && !string.IsNullOrEmpty(label))
            {
                LoginBusy.Text = label;
                LoginBusy.Visibility = Visibility.Visible;
            }
            else
            {
                LoginBusy.Visibility = Visibility.Collapsed;
            }
        }

        public void SetRegisterBusy(bool busy, string label)
        {
            RegisterSubmit.IsEnabled = !busy;
            if (busy && !string.IsNullOrEmpty(label))
            {
                RegisterBusy.Text = label;
                RegisterBusy.Visibility = Visibility.Visible;
            }
            else
            {
                RegisterBusy.Visibility = Visibility.Collapsed;
            }
        }
    }
}