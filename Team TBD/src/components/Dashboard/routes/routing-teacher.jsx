import Starter from "../views/starter/starter-teacher.jsx";
// ui components
import Cards from "../views/ui-components/cards.jsx";
import TooltipComponent from "../views/ui-components/tooltip.jsx";
import Questions from "../views/ui-components/crud/questions.jsx";
import Responses from "../views/ui-components/responses.jsx";
import SingleResponse from "../views/ui-components/singleResponse.jsx";
import ClassRoom from "../views/ui-components/ClassRoom.jsx";
import TeacherClassRoomList from "../views/ui-components/TeacherClassRoomList.jsx";

var ThemeRoutes = [
  {
    path: "/dashboard-teacher",
    name: "Dashboard",
    icon: "ti-loop",
    component: Starter,
  },
  {
    path: "/listclassroom",
    name: "Classrooms",
    icon: "mdi mdi-credit-card-multiple",
    component: TeacherClassRoomList,
  },

  { path: "/teacherClassroom/:handle", component: ClassRoom },
  // {
  //   path: '/payment',
  //   name: 'Payment',
  //   icon: 'mdi mdi-credit-card-multiple',
  //   component: Cards
  // },
  // {
  //   path: '/settings',
  //   name: 'Toltips',
  //   icon: 'mdi mdi-image-filter-vintage',
  //   component: TooltipComponent
  // },
  {
    path: "/quiz",
    pathTo: "/quiz/:question",
    component: Questions,
  },
  {
    path: "/responses",
    pathTo: "/responses/:question",
    component: Responses,
  },
  {
    path: "/view/response/:quiz/:response",
    component: SingleResponse,
  },
  {
    path: "/",
    pathTo: "/dashboard-teacher",
    name: "Dashboard",
    redirect: true,
  },
  {
    path: "/questions",
    pathTo: "/questions/:question",
    name: "Dashboard",
    redirect: true,
  },
];
export default ThemeRoutes;
