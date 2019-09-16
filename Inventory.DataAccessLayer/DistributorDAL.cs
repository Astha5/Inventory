using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Common;
using Inventory.Entities;
using Inventory.Exceptions;

namespace Inventory.DataAccessLayer
{
    public class DistributorDAL
    {
        //Allocating memory for List of type Distributor
        public static List<Distributor> distributorList = new List<Distributor>();

        //Adding new Distributor
        public bool AddDistributorDAL(Distributor newDistributor)
        {
            bool distributorAdded = false;
            try
            {
                distributorList.Add(newDistributor);
                distributorAdded = true;
            }
            catch (SystemException ex)
            {
                throw new InventoryException(ex.Message);
            }
            return distributorAdded;

        }

        //Returning Distributor List
        public List<Distributor> GetAllDistributorsDAL()
        {
            return distributorList;
        }

        //Searching Distributor by Distributor ID
        public Distributor SearchDistributorDAL(int searchDistributorID)
        {
            Distributor searchDistributor = null;
            try
            {
                foreach (Distributor item in distributorList)
                {
                    if (item.DistributorID == searchDistributorID)
                    {
                        searchDistributor = item;
                    }
                }
            }
            catch (SystemException ex)
            {
                throw new InventoryException(ex.Message);
            }
            return searchDistributor;
        }

        //Searching Distributor by Distributor Name
        public List<Distributor> GetDistributorsByNameDAL(string distributorName)
        {
            List<Distributor> searchDistributor = new List<Distributor>();
            try
            {
                foreach (Distributor item in distributorList)
                {
                    if (item.DistributorName == distributorName)
                    {
                        searchDistributor.Add(item);
                    }
                }
            }
            catch (SystemException ex)
            {
                throw new InventoryException(ex.Message);
            }
            return searchDistributor;
        }

        //Updating Distributor Details
        public bool UpdateDistributorDAL(Distributor updateDistributor)
        {
            bool distributorUpdated = false;
            try
            {
                //Update distributor details
                for (int i = 0; i < distributorList.Count; i++)
                {
                    if (distributorList[i].DistributorID == updateDistributor.DistributorID)
                    {
                        updateDistributor.DistributorName =distributorList[i].DistributorName;
                        updateDistributor.DistributorContactNumber = distributorList[i].DistributorContactNumber;
                        distributorUpdated = true;
                    }
                }
            }
            catch (SystemException ex)
            {
                throw new InventoryException(ex.Message);
            }
            return distributorUpdated;

        }

        //Deleting distributor
        public bool DeleteDistributorDAL(int deleteDistributorID)
        {
            bool distributorDeleted = false;
            try
            {
                Distributor deleteDistributor = null;
                foreach (Distributor item in distributorList)
                {
                    if (item.DistributorID == deleteDistributorID)
                    {
                        deleteDistributor = item;
                    }
                }

                if (deleteDistributor != null)
                {
                    distributorList.Remove(deleteDistributor);
                    distributorDeleted = true;
                }
            }
            catch (DbException ex)
            {
                throw new InventoryException(ex.Message);
            }
            return distributorDeleted;

        }

    }
}
