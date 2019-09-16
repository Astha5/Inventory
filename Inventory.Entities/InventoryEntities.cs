using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Entities
{
    //Distributor Class
    public class Distributor
    {
        private int distributorID;
        public int DistributorID
        {
            get { return distributorID; }
            set { distributorID = value; }
        }

        private string distributorName;
        public string DistributorName
        {
            get { return distributorName; }
            set { distributorName = value; }
        }

        private string distributorContactNumber;
        public string DistributorContactNumber
        {
            get { return distributorContactNumber; }
            set { distributorContactNumber = value; }
        }

        private string distributorEmail;
        public string DistributorEmail
        {
            get { return distributorEmail; }
            set { distributorEmail = value; }
        }

        //Distributor Constructor
        public Distributor()
        {
            distributorID = 0;
            distributorName = string.Empty;
            distributorContactNumber = string.Empty;
            distributorEmail = string.Empty;
        }
    }

    //Distributor Address Class
    public class DistributorAddress
    {
        private int distributorAddressID;
        public int DistributorAddressID
        {
            get { return distributorAddressID; }
            set { distributorAddressID = value; }
        }

        private string distributoraddressLine1;
        public string DistributorAddressLine1
        {
            get { return distributoraddressLine1; }
            set { distributoraddressLine1 = value; }
        }

        private string distributoraddressLine2;
        public string DistributorAddressLine2
        {
            get { return distributoraddressLine2; }
            set { distributoraddressLine2 = value; }
        }

        private string distributorcity;
        public string DistributorCity
        {
            get { return distributorcity; }
            set { distributorcity = value; }
        }

        private string distributorstate;
        public string DistributorState
        {
            get { return distributorstate; }
            set { distributorstate = value; }
        }

        private string distributorpincode;
        public string DistributorPincode
        {
            get { return distributorpincode; }
            set { distributorpincode = value; }
        }

        //Distributor Address Constructor
        public DistributorAddress()
        {
            distributorAddressID = 0;
            distributoraddressLine1 = string.Empty;
            distributoraddressLine2 = string.Empty;
            distributorcity = string.Empty;
            distributorstate = string.Empty;
            distributorpincode = string.Empty;
        }
    }

}
