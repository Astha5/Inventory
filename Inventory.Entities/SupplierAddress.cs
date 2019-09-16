using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Entities
{
    public class SupplierAddress
    {



        private string _supplierId;
        public string SupplierId
        {
            get { return _supplierId; }
            set { _supplierId = value; }
        }

        private string _supplierAddressLine1;
        public string SupplierAddressLine1
        {
            get { return _supplierAddressLine1; }
            set { _supplierAddressLine1 = value; }
        }

        private string _supplierAddressLine2;
        public string SupplierAddressLine2
        {
            get { return _supplierAddressLine2; }
            set { _supplierAddressLine2 = value; }
        }
        private string _supplierCity;
        public string SupplierCity
        {
            get { return _supplierCity; }
            set { _supplierCity = value; }
        }
        private string _supplierState;
        public string SupplierState
        {
            get { return _supplierState; }
            set { _supplierState = value; }
        }
        private string _supplierPin;
        public string SupplierPin
        {
            get { return _supplierPin; }
            set { _supplierPin = value; }
        }
        public SupplierAddress()
        {
            _supplierId = null;
            _supplierAddressLine1 = null;
            _supplierAddressLine1 = null;
            _supplierCity = null;
            _supplierPin = null;

        }
    }
}
