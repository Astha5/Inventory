using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Entities
{
    public class RawMaterialOrderDetails
    {

        public int RawMaterialID { get; set; }
        public int RawMaterialOrderQuantity { get; set; }
        public double RawMaterialUnitPrice { get; set; }
        private double Amount { get; set; }
    }
}
