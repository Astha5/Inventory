using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Inventory.BusinessLayer;
using Inventory.DataAccessLayer;
using Inventory.Entities;
using Inventory.Exceptions;

namespace Inventory
{
    class Program
    {
        static void Main()
        {
            int temp,flag;
            Console.WriteLine("ENTER CHOICE:");
            Console.WriteLine("1.System User");
            Console.WriteLine("2.Supplier");
            Console.WriteLine("3.Distributor");
            temp = Convert.ToInt32(Console.ReadLine());

            switch (temp)
            {
                case 1:
                    Console.WriteLine("Which System you want to enter?");
                    Console.WriteLine("1.Supplier");
                    Console.WriteLine("2.Distributor");
                    flag = Convert.ToInt32(Console.ReadLine());
                    if (flag == 1)
                    {
                        Console.WriteLine("system user is in supplier");
                    }
                    else if (flag == 2)
                    {
                        int choice;
                        do
                        {
                            PrintMenu();
                            Console.WriteLine("Enter your Choice:");
                            choice = Convert.ToInt32(Console.ReadLine());
                            switch (choice)
                            {
                                case 1:
                                    AddDistributor();
                                    break;
                                case 2:
                                    ListAllDistributors();
                                    break;
                                case 3:
                                    SearchDistributorByID();
                                    break;
                                case 4:
                                    UpdateDistributor();
                                    break;
                                case 5:
                                    DeleteDistributor();
                                    break;
                                case 6:
                                    return;
                                default:
                                    Console.WriteLine("Invalid Choice");
                                    break;
                            }
                        } while (choice != -1);
                    }
                    else
                        Console.WriteLine("Invalid choice");
                    break;
                case 2:
                    Console.WriteLine("In Supplier");
                    break;
                case 3:
                    Console.WriteLine("In Distributor");
                    break;
                default:
                    Console.WriteLine("Invalid Input");
                    break;
            }

            Console.ReadKey();
        }

        private static void DeleteDistributor()
        {
            try
            {
                int deleteDistributorID;
                Console.WriteLine("Enter DistributorID to Delete:");
                deleteDistributorID = Convert.ToInt32(Console.ReadLine());
                Distributor deleteDistributor = DistributorBL.SearchDistributorBL(deleteDistributorID);
                if (deleteDistributor != null)
                {
                    bool distributordeleted = DistributorBL.DeleteDistributorBL(deleteDistributorID);
                    if (distributordeleted)
                        Console.WriteLine("Distributor Deleted");
                    else
                        Console.WriteLine("Distributor not Deleted ");
                }
                else
                {
                    Console.WriteLine("No Distributor Details Available");
                }


            }
            catch (InventoryException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private static void UpdateDistributor()
        {
            try
            {
                int updateDistributorID;
                Console.WriteLine("Enter DistributorID to Update Details:");
                updateDistributorID = Convert.ToInt32(Console.ReadLine());
                Distributor updatedDistributor = DistributorBL.SearchDistributorBL(updateDistributorID);
                if (updatedDistributor != null)
                {
                    Console.WriteLine("Update Distributor Name :");
                    updatedDistributor.DistributorName = Console.ReadLine();
                    Console.WriteLine("Update PhoneNumber :");
                    updatedDistributor.DistributorContactNumber = Console.ReadLine();
                    bool distributorUpdated = DistributorBL.UpdateDistributorBL(updatedDistributor);
                    if (distributorUpdated)
                        Console.WriteLine("Distributor Details Updated");
                    else
                        Console.WriteLine("Distributor Details not Updated ");
                }
                else
                {
                    Console.WriteLine("No Distributor Details Available");
                }


            }
            catch (InventoryException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private static void SearchDistributorByID()
        {
            try
            {
                int searchDistributorID;
                Console.WriteLine("Enter Distributor ID to Search:");
                searchDistributorID = Convert.ToInt32(Console.ReadLine());
                Distributor searchDistributor = DistributorBL.SearchDistributorBL(searchDistributorID);
                if (searchDistributor != null)
                {
                    Console.WriteLine("******************************************************************************");
                    Console.WriteLine("DistributorID\t\tDistributor Name\t\tPhoneNumber");
                    Console.WriteLine("******************************************************************************");
                    Console.WriteLine("{0}\t\t{1}\t\t{2}", searchDistributor.DistributorID, searchDistributor.DistributorName, searchDistributor.DistributorContactNumber);
                    Console.WriteLine("******************************************************************************");
                }
                else
                {
                    Console.WriteLine("No Distributor Details Available");
                }

            }
            catch (InventoryException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        
        private static void ListAllDistributors()
        {
            try
            {
                List<Distributor> distributorList = DistributorBL.GetAllDistributorsBL();
                if (distributorList != null)
                {
                    Console.WriteLine("******************************************************************************");
                    Console.WriteLine("Distributor ID\t\tDistributor Name\t\tPhoneNumber");
                    Console.WriteLine("******************************************************************************");
                    foreach (Distributor distributor in distributorList)
                    {
                        Console.WriteLine("{0}\t\t{1}\t\t{2}", distributor.DistributorID, distributor.DistributorName, distributor.DistributorContactNumber);
                    }
                    Console.WriteLine("******************************************************************************");

                }
                else
                {
                    Console.WriteLine("No Guest Details Available");
                }
            }
            catch (InventoryException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private static void AddDistributorAddress()
        {
            DistributorAddress distributorAddress = new DistributorAddress();
            Console.WriteLine("Enter Distributor Address ID :");
            distributorAddress.DistributorAddressID = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Enter Distributor Address Line1 :");
            distributorAddress.DistributorAddressLine1 = Console.ReadLine();
            Console.WriteLine("Enter Distributor Address Line2 :");
            distributorAddress.DistributorAddressLine2 = Console.ReadLine();
            Console.WriteLine("Enter Distributor City :");
            distributorAddress.DistributorCity = Console.ReadLine();
            Console.WriteLine("Enter Distributor State :");
            distributorAddress.DistributorState = Console.ReadLine();
            Console.WriteLine("Enter Pincode :");
            distributorAddress.DistributorPincode = Console.ReadLine();

        }

        private static void AddDistributor()
        {
            try
            {
                DistributorAddress distributorAddress = new DistributorAddress();
                Distributor distributor = new Distributor();
                Console.WriteLine("Enter Distributor ID :");
                distributor.DistributorID = Convert.ToInt32(Console.ReadLine());
                Console.WriteLine("Enter Distributor Name :");
                distributor.DistributorName = Console.ReadLine();
                Console.WriteLine("Enter PhoneNumber :");
                distributor.DistributorContactNumber = Console.ReadLine();
                Console.WriteLine("Enter Email ID :");
                distributor.DistributorEmail = Console.ReadLine();
                Console.WriteLine("Enter Distributor Address: ");
                if (distributor.DistributorID==distributorAddress.DistributorAddressID)
                {
                    
                }

                bool distributorAdded = DistributorBL.AddDistributorBL(distributor);
                if (distributorAdded)
                    Console.WriteLine("Distributor Added");
                else
                    Console.WriteLine("Distributor not Added");
            }
            catch (InventoryException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private static void PrintMenu()
        {
            Console.WriteLine("\n***********Distributor***********");
            Console.WriteLine("1. Add Distributor");
            Console.WriteLine("2. List All Distributor");
            Console.WriteLine("3. Search Distributor by ID");
            Console.WriteLine("4. Update Distributor");
            Console.WriteLine("5. Delete Distributor");
            Console.WriteLine("6. Exit");
            Console.WriteLine("******************************************\n");

        }
    }
}
