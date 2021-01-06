import { useContext, useState, useEffect } from "react";
import { Context } from "../../Context/Context";
import { getMyTransactions, loadedService } from "../../configs/services";
import "./Profile.css";
import Header from "../../elements/Header/Header";
import profile from "../../assets/profile.png";
import Transaksi from "./Transaksi";

function Profile() {
  const [state, dispatch] = useContext(Context);
  const [userData, setUserData] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getMyTransactions(setTransactions);
    setUserData(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <div className="page-profile">
      <div>
        <Header />
      </div>
      <div className="profile-section-wrapper">
        <div className="box-profile">
          <h2 className="profile-title">My Profile</h2>
          <div className="detail-profile">
            <img className="pict" src={profile} alt="profile" />
            <div className="profile-data">
              <p className="sub-title">Full Name</p>
              <p className="sub-value">
                {userData.profile
                  ? userData.profile.fullName
                  : userData.fullName}
              </p>
              <p className="sub-title">Email</p>
              <p className="sub-value">
                {userData.profile ? userData.profile.email : userData.email}
              </p>
            </div>
          </div>
        </div>
        <div className="profile-page-width-con-right">
          <h2 className="profile-page-title">My Transactions</h2>
          <div className="trans">
            {transactions.length > 0
              ? transactions.map((transaction, index) => {
                  return <Transaksi transaction={transaction} key={index} />;
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
