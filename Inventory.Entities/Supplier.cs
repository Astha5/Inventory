using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Entities
{

    public class Supplier
    {
        //Supplier fields
        private string _supplierName;


        private string _supplierId;


        private string _supplierPhone;


        private string _supplierEmail;
        //constructor
        public Supplier()
        {
            SupplierName = null;
            SupplierId = null;
            SupplierEmail = null;
            SupplierPhone = null;

        }
        //auto implemented property
        public string SupplierName { get => _supplierName; set => _supplierName = value; }
        public string SupplierId { get => _supplierId; set => _supplierId = value; }
        public string SupplierPhone { get => _supplierPhone; set => _supplierPhone = value; }
        public string SupplierEmail { get => _supplierEmail; set => _supplierEmail = value; }



    }



}
