import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import DisplaySkills from "./pages/skills/DisplaySkills";
import AddSkills from "./pages/skills/AddSkills";
import AddSubSkills from "./pages/subSkills/AddSubSkills";
import DisplaySubSkills from "./pages/subSkills/DisplaySubSkills";
import Login from "./pages/login/Login";
// babita
import AddRechargePlans from "./pages/recharge/AddRechargePlans";
import DisplayRechargePlans from "./pages/recharge/DisplayRechargePlans";
import DisplayFirstRechargeOffer from "./pages/recharge/DisplayFirstRechargeOffer";
import AddFirstRechargeOffer from "./pages/recharge/AddFirstRechargeOffer";
import Notifications from "./pages/notification/Notifications";

import AddRemedies from "./pages/remedies/AddRemedies";
import DisplayRemedies from "./pages/remedies/DisplayRemedies";
import DisplayExpertise from "./pages/expertise/DisplayExpertise";
import AddExpertise from "./pages/expertise/AddExpertise";
import DisplayMainExpertise from "./pages/expertise/DisplayMainExpertise";
import AddMainExpertise from "./pages/expertise/AddMainExpertise";
import DisplayCustomer from "./pages/customer/DisplayCustomer";
import AddCustomer from "./pages/customer/AddCustomer";
import DisplayReview from "./pages/review/DisplayReview";
import AddReview from "./pages/review/AddReview";
import DisplayMessage from "./pages/message/DisplayMessage";
import AddMessage from "./pages/message/AddMessage";
import DisplayAstrologer from "./pages/astrologer/DisplayAstrologer";
import AddAstrologers from "./pages/astrologer/AddAstrologers";
import DisplayEnquiry from "./pages/astrologer/DisplayEnquiry";
import AddEnquiry from "./pages/astrologer/AddEnquiry";
import ChatHistory from "./pages/history/ChatHistory";
import CallHistory from "./pages/history/CallHistory";
import UsersGiftHistory from "./pages/history/UsersGiftHistory";
import LiveStream from "./pages/livestream/DisplayLiveStream";
import DisplayUser from "./pages/user/DisplayUser";
import AddUser from "./pages/user/AddUser";
import DisplayGift from "./pages/gift/DisplayGift";
import AddGift from "./pages/gift/AddGift";
import DisplayAstroblog from "./pages/astroblog/DisplayAstroblog";
import AddAstroblog from "./pages/astroblog/AddAstroblog";
import AddAppverstion from "./pages/appverstion/AddAppverstion";
import DisplayAnnouncements from "./pages/announcements/DisplayAnnouncements";
import AddAnnouncements from "./pages/announcements/AddAnnouncements";
import DisplayTitle from "./pages/askastrologer/DisplayTitle";
import AddTitle from "./pages/askastrologer/AddTitle";
import DisplayListOfQuestion from "./pages/askastrologer/DisplayListOfQuestion";
import AddListOfQuestion from "./pages/askastrologer/AddListOfQuestion";
import DisplayWebsiteBanner from "./pages/banner/DisplayWebsiteBanner";
import AddWebSiteBanaer from "./pages/banner/AddWebsiteBanner";
import DisplayAppBanner from "./pages/banner/DisplayAppBanner";
import AddAppBanner from "./pages/banner/AddAppBanner";
import DisplayFaq from "./pages/pages/DisplayFaq";
import AddFaq from "./pages/pages/AddFaq";
import TermsAndConditions from "./pages/pages/TermsAndConditions";
import PrivacyPolicy from "./pages/pages/PrivacyPolicy";
import DisplayTestimonials from "./pages/pages/DisplayTestmonials";
import AddTestmonials from "./pages/pages/AddTestimonials";
import DisplayOurAstrologers from "./pages/pages/DisplayOurAstrologers";
import AddOurAstrologers from "./pages/pages/AddOurAstrologers";
import DisplayHowToUseVideos from "./pages/pages/DisplayHowToUseVideos";
import AddHowToUseVideo from "./pages/pages/AddHowToUseVideo";
import DisplayHowToUse from "./pages/pages/DisplayHowToUse";
import AddHowToUse from "./pages/pages/AddHowToUse";
import AdminEarning from "./pages/reports/AdminEarning";
import ReceiptSummary from "./pages/reports/ReceiptSummary";
import SaleSummary from "./pages/reports/SaleSummary";
import EditAstrologer from "./pages/astrologer/EditAstrologer";
import Try from "../src/pages/try/Try";
import GooglePlacesAutocomplete from "../src/pages/try/Try";
import DisplayNotification from "./pages/notification/DisplayNotification";
import DisplayCustomerOrderHistory from "./pages/customer/DisplayCustomerOrderHistory";
import DisplayCustomerPaymentHistory from "./pages/customer/DisplayCustomerPaymentHisotry";
import AppReviews from "./pages/review/AppReviews";
import CustomerNotification from "./pages/notification/CustomerNotification";
import AstrologerNotification from "./pages/notification/AstrologerNotification";
import ChatSummary from "./pages/history/ChatSummary";
import TopAstrologers from "./pages/astrologer/TopAstrologers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="*" element={<> Not Ready</>} />
          <Route path="/addSkills" element={<AddSkills />} />
          <Route path="/displaySkills" element={<DisplaySkills />} />
          <Route path="/addSubSkills" element={<AddSubSkills />} />
          <Route path="/displaySubSkills" element={<DisplaySubSkills />} />
          <Route path="/addRechargePlan" element={<AddRechargePlans />} />
          <Route
            path="/displayRechargePlan"
            element={<DisplayRechargePlans />}
          />
          <Route
            path="/displayFirstRechargeOffer"
            element={<DisplayFirstRechargeOffer />}
          />
          <Route
            path="/addFirstRechargeOffer"
            element={<AddFirstRechargeOffer />}
          />
          <Route path="/notifications" element={<Notifications />} />
          <Route
            path="/displayNotifications"
            element={<DisplayNotification />}
          />

          <Route path="/displayRemedise" element={<DisplayRemedies />} />
          <Route path="/AddRemedies" element={<AddRemedies />} />
          <Route path="/displayExpertise" element={<DisplayExpertise />} />
          <Route path="/AddExpertise" element={<AddExpertise />} />
          <Route
            path="/displayMainExpertise"
            element={<DisplayMainExpertise />}
          />
          <Route path="/AddMainExpertise" element={<AddMainExpertise />} />
          <Route path="/displayCustomer" element={<DisplayCustomer />} />
          <Route
            path="/displayCustomerOrderHistory"
            element={<DisplayCustomerOrderHistory />}
          />
          <Route
            path="/displayCustomerPaymentHistory"
            element={<DisplayCustomerPaymentHistory />}
          />
          <Route path="/AddCustomer" element={<AddCustomer />} />
          <Route path="/displayReview" element={<DisplayReview />} />
          <Route path="/appReviews" element={<AppReviews />} />
          <Route path="/AddReview" element={<AddReview />} />
          <Route path="displaymessage" element={<DisplayMessage />} />
          <Route path="AddMessage" element={<AddMessage />} />
          <Route
            path="/astrologers/topAstrologers"
            element={<TopAstrologers />}
          />
          <Route
            path="/astrologers/displayAstrologer"
            element={<DisplayAstrologer />}
          />
          <Route
            path="/astrologers/AddAstrologers"
            element={<AddAstrologers />}
          />
          <Route path="/editAstrologer" element={<EditAstrologer />} />
          <Route path="/displayEnquiry" element={<DisplayEnquiry />} />
          <Route path="/AddEnquiry" element={<AddEnquiry />} />
          <Route path="/history/ChatHistory" element={<ChatHistory />} />
          <Route path="/history/CallHistory" element={<CallHistory />} />
          <Route
            path="/history/UsersGiftHistory"
            element={<UsersGiftHistory />}
          />
          <Route path="/liveStream" element={<LiveStream />} />
          <Route path="/displayUser" element={<DisplayUser />} />
          <Route path="/AddUser" element={<AddUser />} />
          <Route path="/displayGift" element={<DisplayGift />} />
          <Route path="/AddGift" element={<AddGift />} />
          <Route path="/displayAstroblog" element={<DisplayAstroblog />} />
          <Route path="/AddAstroblog" element={<AddAstroblog />} />
          <Route path="/appVersion" element={<AddAppverstion />} />
          <Route
            path="/displayAnnouncements"
            element={<DisplayAnnouncements />}
          />
          <Route path="/AddAnnouncements" element={<AddAnnouncements />} />
          <Route path="/displayTitle" element={<DisplayTitle />} />
          <Route path="/AddTitle" element={<AddTitle />} />
          <Route
            path="/displayListOfQuestions"
            element={<DisplayListOfQuestion />}
          />
          <Route path="/AddListOfQuestion" element={<AddListOfQuestion />} />
          <Route
            path="/displayWebsiteBanner"
            element={<DisplayWebsiteBanner />}
          />
          <Route path="/AddWebsiteBanner" element={<AddWebSiteBanaer />} />
          <Route path="/displayAppBanner" element={<DisplayAppBanner />} />
          <Route path="/AddAppBanner" element={<AddAppBanner />} />
          <Route path="/displayFaq" element={<DisplayFaq />} />
          <Route path="/AddFaq" element={<AddFaq />} />
          <Route
            path="/displayTermsAndConditions"
            element={<TermsAndConditions />}
          />
          <Route path="/displayPrivacyPolicy" element={<PrivacyPolicy />} />
          <Route
            path="/displayTestimonials"
            element={<DisplayTestimonials />}
          />
          <Route path="/AddTestmonials" element={<AddTestmonials />} />
          <Route
            path="/displayOurAstrologers"
            element={<DisplayOurAstrologers />}
          />
          <Route path="/AddOurAstrologers" element={<AddOurAstrologers />} />
          <Route
            path="/displayHowToUseVideos"
            element={<DisplayHowToUseVideos />}
          />
          <Route path="/AddHowToUseVideo" element={<AddHowToUseVideo />} />
          <Route path="/displayHowToUse" element={<DisplayHowToUse />} />
          <Route path="/AddHowToUse" element={<AddHowToUse />} />
          <Route path="/adminEarning" element={<AdminEarning />} />
          <Route path="/receiptSummary" element={<ReceiptSummary />} />
          <Route path="/saleSummary" element={<SaleSummary />} />
          <Route
            path="/customerNotification"
            element={<CustomerNotification />}
          />
          <Route
            path="/astrologerNotification"
            element={<AstrologerNotification />}
          />
          <Route path="chatSummary" element={<ChatSummary />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
