using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Inventory.Entities
{
    public class RawMaterialOrder
    {
        public int RawMaterialOrderID { get; set; }
        List<RawMaterialOrderDetails> Order = new List<RawMaterialOrderDetails>();
        double TotalAmount { get; set; }
    }
}
