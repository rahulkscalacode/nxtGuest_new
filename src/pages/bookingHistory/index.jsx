import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import "./index.css";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";

const Index = () => {
  const navigate = useNavigate();

  const bookings = [
    {
      date: "07/03/2024",
      pickup: "Noida",
      drop: "Delhi",
      status: "Completed",
      action: "View",
    },
    {
      date: "07/03/2024",
      pickup: "Noida",
      drop: "Delhi",
      status: "Completed",
      action: "View",
    },
    {
      date: "07/03/2024",
      pickup: "Noida",
      drop: "Delhi",
      status: "Cancelled",
      action: "View",
    },
    {
      date: "07/03/2024",
      pickup: "Noida",
      drop: "Delhi",
      status: "Booked",
      action: "View",
    },
    {
      date: "07/03/2024",
      pickup: "Noida",
      drop: "Delhi",
      status: "Approved",
      action: "View",
    },
    {
      date: "07/03/2024",
      pickup: "Noida",
      drop: "Delhi",
      status: "Approved",
      action: "View",
    },
    {
      date: "07/03/2024",
      pickup: "Noida",
      drop: "Delhi",
      status: "Completed",
      action: "View",
    },
    {
      date: "07/03/2024",
      pickup: "Noida",
      drop: "Delhi",
      status: "Completed",
      action: "View",
    },
    {
      date: "07/03/2024",
      pickup: "Noida",
      drop: "Delhi",
      status: "Completed",
      action: "View",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const bookingsPerPage = 10;

  const pageCount = Math.ceil(bookings.length / bookingsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * bookingsPerPage;
  const currentBookings = bookings.slice(offset, offset + bookingsPerPage);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "completed";
      case "Cancelled":
        return "cancelled";
      case "Booked":
        return "booked";
      case "Approved":
        return "approved";
      case "Rejected":
        return "rejected";
      default:
        return "";
    }
  };

  const handleView = (booking) => {
    navigate("/booking-details", { state: booking });
  };
  return (
    <Layout footer={<Footer />}>
      <div>
        <div className="head ms-2">Booking History</div>
        <div className="booking-history mt-3">
          <div className="table-container">
            <table>
              <thead>
                <tr className="fontsixe15">
                  <th>Date</th>
                  <th>Pickup</th>
                  <th>Drop</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="fontsixe14">
                {currentBookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.date}</td>
                    <td>{booking.pickup}</td>
                    <td>{booking.drop}</td>
                    <td className={getStatusClass(booking.status)}>
                      {booking.status}
                    </td>
                    <td
                      style={{ color: "#1052FB", cursor: "pointer" }}
                      onClick={() => handleView(booking)}
                    >
                      {booking.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
