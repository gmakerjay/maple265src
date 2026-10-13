using System;
using System.Text;

namespace v232.Launcher.WPF.Models
{
    public static class Configs
    {
        // Local login: skips WZ checksum verification against the backend.
        // gms265 (v265) does not implement the file-checksum API, so this must stay true.
        public static bool LocalLogin = true;

        public static int APIServerPort => ServerInfo.ApiPort;

        /// <summary>
        /// Server address, taken from server_info.txt (embedded at build time).
        /// </summary>
        public static string GetServerIP()
        {
            string ip = ServerInfo.Ip;
            return string.IsNullOrEmpty(ip) ? "127.0.0.1" : ip;
        }
    }
}