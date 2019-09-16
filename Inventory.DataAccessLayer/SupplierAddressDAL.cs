using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inventory.Entities;
using System.Data.Common;


using Inventory.Exceptions;



namespace Inventory.DataAccessLayer
{
    public class SupplierAddressDAL
    {
        public static List<SupplierAddress> SupplierAddressList = new List<SupplierAddress>();

        public bool AddSupplierAddressDAL(SupplierAddress newSupplierAddress)
        {
            bool SupplierAddressAdded = false;
            try
            {
                SupplierAddressList.Add(newSupplierAddress);
                SupplierAddressAdded = true;
            }
            catch (SystemException ex)
            {
                throw new InventoryException(ex.Message);
            }
            return SupplierAddressAdded;

        }

        public List<SupplierAddress> GetAllSupplierAddressDAL()
        {
            return SupplierAddressList;
        }

        public SupplierAddress SearchSupplierAddressDAL(int searchSupplierId)
        {
            SupplierAddress searchSupplierAddress = null;
            try
            {
                foreach (SupplierAddress item in SupplierAddressList)
                {
                    if ((item.SupplierId).Equals(searchSupplierId))
                    {
                        searchSupplierAddress = item;
                    }
                }
            }
            catch (SystemException ex)
            {
                throw new InventoryException(ex.Message);
            }
            return searchSupplierAddress;
        }




        public bool UpdateSupplierAddressDAL(SupplierAddress updateSupplierAddress)
        {
            bool SupplierAddressUpdated = false;
            try
            {
                for (int i = 0; i < SupplierAddressList.Count; i++)
                {
                    if (SupplierAddressList[i].SupplierId == updateSupplierAddress.SupplierId)
                    {
                        updateSupplierAddress.SupplierAddressLine1 = SupplierAddressList[i].SupplierAddressLine1;
                        updateSupplierAddress.SupplierAddressLine2 = SupplierAddressList[i].SupplierAddressLine2;
                        updateSupplierAddress.SupplierCity = SupplierAddressList[i].SupplierCity;
                        updateSupplierAddress.SupplierState = SupplierAddressList[i].SupplierState;
                        SupplierAddressUpdated = true;
                    }
                }
            }
            catch (SystemException ex)
            {
                throw new InventoryException(ex.Message);
            }
            return SupplierAddressUpdated;

        }

        public bool DeleteSupplierAddressDAL(int deleteSupplierId)
        {
            bool SupplierAddressDeleted = false;
            try
            {
                SupplierAddress deleteSupplierAddress = null;
                foreach (SupplierAddress item in SupplierAddressList)
                {
                    if ((item.SupplierId).Equals(deleteSupplierId))
                    {
                        deleteSupplierAddress = item;
                    }
                }

                if (deleteSupplierAddress != null)
                {
                    SupplierAddressList.Remove(deleteSupplierAddress);
                    SupplierAddressDeleted = true;
                }
            }
            catch (DbException ex)
            {
                throw new InventoryException(ex.Message);
            }
            return SupplierAddressDeleted;

        }
    }
}
