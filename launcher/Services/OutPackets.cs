using v232.Launcher.WPF.Models;

namespace v232.Launcher.WPF.Services
{
    public static class OutPackets
    {
        // gms265 (v265) uses the X64 login path: REQUEST_TOKEN_X64 = 102.
        // REQUEST_TOKEN (100) is intentionally a no-op on the server.
        private static int AuthRequestPacket = 102;
        private static int CreateAccountPacket = 101;
        private static int AccountDataPacket = 103;

        public static OutPacket AuthRequest(string username, string pwd)
        {
            OutPacket outPacket = new OutPacket((short)AuthRequestPacket);
            outPacket.WriteString(username);
            outPacket.WriteString(pwd);
            return outPacket;
        }

        public static OutPacket CreateAccountRequest(string username, string pwd, string email)
        {
            OutPacket outPacket = new OutPacket((short)CreateAccountPacket);
            outPacket.WriteString(username);
            outPacket.WriteString(pwd);
            outPacket.WriteString(email);
            return outPacket;
        }

        /// <summary>
        /// Asks the API for the account overview (cash balances + top characters).
        /// Authenticated with the login token, so no password is sent.
        /// </summary>
        public static OutPacket AccountDataRequest(int token)
        {
            OutPacket outPacket = new OutPacket((short)AccountDataPacket);
            outPacket.WriteInt(token);
            return outPacket;
        }
    }
}