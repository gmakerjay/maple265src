using System.Collections.Generic;

namespace v232.Launcher.WPF.Models
{
    public class CharSummary
    {
        public string Name;
        public int Level;
        public int Job;
        public string JobName;
        public int Field;
    }

    public class AccountSnapshot
    {
        public bool Success;
        public int Nx;
        public int Dp;
        public int Vp;
        public List<CharSummary> Characters = new List<CharSummary>();
    }
}
