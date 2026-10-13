using System.Text;

namespace v232.Launcher.WPF.Models
{
    public class OutPacket
    {
        public byte[] buf = new byte[256];
        public int len;

        public OutPacket(short op)
        {
            this.WriteShort(op);
        }

        public void WriteShort(short s)
        {
            this.Write(new byte[2]
            {
                (byte) s,
                (byte) ((uint) s >> 8)
            });
        }

        public void WriteByte(byte b)
        {
            this.Write(new byte[1] { b });
        }

        public void WriteInt(int i)
        {
            this.Write(new byte[4]
            {
                (byte) i,
                (byte) (i >> 8),
                (byte) (i >> 16),
                (byte) (i >> 24)
            });
        }

        public void WriteString(string str)
        {
            // Server side decodes strings as UTF-8 with a byte-count prefix.
            byte[] bytes = Encoding.UTF8.GetBytes(str);
            this.WriteShort((short)bytes.Length);
            this.Write(bytes);
        }

        public void Write(byte[] data)
        {
            if (this.len + data.Length > this.buf.Length)
            {
                int newCap = System.Math.Max(this.buf.Length * 2, this.len + data.Length + 256);
                System.Array.Resize(ref this.buf, newCap);
            }
            int len = this.len;
            foreach (byte num in data)
            {
                this.buf[len] = num;
                ++len;
            }
            this.len = len;
        }
    }
}
