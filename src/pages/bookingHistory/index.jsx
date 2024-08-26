import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./index.css";
import Layout from "../../components/layout";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
import { apiCall } from "../../functions/api/apiGlobal";
import Cookies from "universal-cookie";

const Index = () => {
  const cookies = new Cookies();
  const tokenUserId = cookies.get("userId");
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall(
          "GET",
          "/user/booking-history",
          {},
          {},
          null,
          {
            user_id: tokenUserId, // Pass tokenUserId in headers
          }
        );
        // const bookingData = response.data.bookingData
        // console.log("bookingdata response----->>>>",bookingData)
        setBookings(response.data.bookingData);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchData();
  }, []);

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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;
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
                    <td>{formatDate(booking.dateOfRide)}</td>
                    <td>{booking.pickupLocation}</td>
                    <td>{booking.dropLocation}</td>
                    <td className={getStatusClass("Completed")}>
                      {booking.status ?? "Completed"}
                    </td>
                    <td
                      style={{ color: "#1052FB", cursor: "pointer" }}
                      onClick={() => handleView(booking)}
                    >
                      {/* {booking.action} */}
                      View
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
