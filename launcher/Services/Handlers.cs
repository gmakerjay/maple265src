using System;
using System.Threading.Tasks;
using v232.Launcher.WPF.Models;

namespace v232.Launcher.WPF.Services
{
    public static class Handlers
    {
        /// <summary>
        /// Parses authentication response and returns the token.
        /// gms265 (v265) responds on header 102 (REQUEST_TOKEN_RESULT_X64):
        ///   [result: byte][token: int]  where token is present only on success.
        /// Result codes: 0 = success, 1 = invalid credentials, 2 = too many requests,
        /// 3 = wrong version, 4 = wrong WZ, 5 = banned, 6 = already logged in.
        /// </summary>
        public static (byte result, long token) GetAuthTokenFromInput(InPacket inPacket)
        {
            inPacket.readInt(); // packet length
            inPacket.readShort(); // header
            byte result = inPacket.readByte();

            if (result == 0) // Success
            {
                long token = inPacket.readInt();
                Console.WriteLine("Token: " + token);
                return (result, token);
            }

            Console.WriteLine("Login failed with result code: " + result);
            return (result, 0);
        }

        /// <summary>
        /// Sends authentication request and returns (result, token).
        /// Result codes: 0 = success, 1 = invalid credentials, 2+ = other errors.
        /// </summary>
        public static async Task<(byte result, long token)> SendAuthRequest(string username, string password, Client client)
        {
            return await Task.Run(() =>
            {
                try
                {
                    client.Send(OutPackets.AuthRequest(username, password));
                    InPacket inPacket = client.Receive();
                    var authResult = GetAuthTokenFromInput(inPacket);
                    return (authResult.result, authResult.token);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return ((byte)4, 0L);
                }
            });
        }

        /// <summary>
        /// Sends account creation request.
        /// Result codes: 0 = success, 1 = username taken, 2 = IP already created, 3 = unknown error
        /// </summary>
        public static async Task<byte> SendAccountCreateRequest(string username, string password, string email, Client client)
        {
            return await Task.Run(() =>
            {
                try
                {
                    client.Send(OutPackets.CreateAccountRequest(username, password, email));
                    InPacket inPacket = client.Receive();
                    inPacket.readInt(); // packet length
                    inPacket.readShort(); // header
                    byte result = inPacket.readByte();
                    return result;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    return (byte)3;
                }
            });
        }

        /// <summary>
        /// Requests the account overview on header 103 (REQUEST_ACCOUNT_DATA_X64).
        /// Response: [result: byte] then, when result == 0,
        ///   [nx: int][dp: int][vp: int][count: byte]
        ///   per character: [name: string][level: int][job: int][jobName: string][field: int]
        /// result: 0 = success, 1 = invalid or expired token.
        /// </summary>
        public static async Task<AccountSnapshot> SendAccountDataRequest(int token, Client client)
        {
            return await Task.Run(() =>
            {
                var snapshot = new AccountSnapshot();
                try
                {
                    client.Send(OutPackets.AccountDataRequest(token));
                    InPacket inPacket = client.Receive();
                    if (inPacket == null) return snapshot;

                    inPacket.readInt(); // packet length
                    inPacket.readShort(); // header
                    byte result = inPacket.readByte();

                    snapshot.Success = result == 0;
                    if (!snapshot.Success) return snapshot;

                    snapshot.Nx = inPacket.readInt();
                    snapshot.Dp = inPacket.readInt();
                    snapshot.Vp = inPacket.readInt();

                    int count = inPacket.readByte();
                    for (int i = 0; i < count; i++)
                    {
                        var chr = new CharSummary
                        {
                            Name = inPacket.readString(),
                            Level = inPacket.readInt(),
                            Job = inPacket.readInt(),
                            JobName = inPacket.readString(),
                            Field = inPacket.readInt()
                        };
                        snapshot.Characters.Add(chr);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Account data failed: " + ex.Message);
                    snapshot.Success = false;
                }
                return snapshot;
            });
        }
    }
}