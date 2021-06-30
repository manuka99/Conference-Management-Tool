import { InboxIcon } from "../assets/StyleImports";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

export const NavItems1 = () => {
  return [
    {
      id: 1,
      name: "Reports",
      to: "",
      iconFront: <InboxIcon />,
      hasChildren: true,
      isChild: false,
      children: [
        {
          id: 2,
          name: "Dashboard",
          to: "",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 3,
          name: "Statistics",
          to: "",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 4,
          name: "Statistics-data",
          to: "",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
      ],
    },
    {
      id: 5,
      name: "Users",
      to: "/protected/users/roles",
      iconFront: <InboxIcon />,
      hasChildren: true,
      isChild: false,
      children: [
        {
          id: 6,
          name: "Admin",
          to: "/protected/users/roles/admin",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 7,
          name: "Editor",
          to: "/protected/users/roles/editor",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 8,
          name: "Reviewer",
          to: "/protected/users/roles/reviewer",
          iconFront: <InboxIcon />,
          hasChildren: false,
          isChild: true,
        },
        {
          id: 9,
          name: "Member",
          to: "/protected/users/roles/member",
          iconFront: <InboxIcon />,
          hasChildren: true,
          isChild: true,
          children: [
            {
              id: 10,
              name: "Innovator",
              to: "/protected/users/roles/innovator",
              iconFront: <InboxIcon />,
              hasChildren: false,
              isChild: true,
            },
            {
              id: 11,
              name: "Researcher",
              to: "/protected/users/roles/researcher",
              iconFront: <InboxIcon />,
              hasChildren: false,
              isChild: true,
            },
            {
              id: 12,
              name: "Presenter",
              to: "/protected/users/roles/presenter",
              iconFront: <InboxIcon />,
              hasChildren: false,
              isChild: true,
            },
            {
              id: 13,
              name: "Attendee",
              to: "/protected/users/roles/attendee",
              iconFront: <InboxIcon />,
              hasChildren: false,
              isChild: true,
            },
          ],
        },
      ],
    },
    {
      id: 14,
      name: "Profile",
      to: "/protected/profile",
      iconFront: <AccountBoxIcon />,
      hasChildren: false,
      isChild: false,
    },
  ];
};
export const NavItems2 = () => {
  return [
    {
      id: 1,
      name: "Conferences",
      to: "",
      iconFront: <InboxIcon />,
      hasChildren: false,
      isChild: false,
    },
    {
      id: 2,
      name: "Workshops",
      to: "",
      iconFront: <InboxIcon />,
      hasChildren: false,
      isChild: true,
    },
    {
      id: 3,
      name: "Posts",
      to: "/protected/posts",
      iconFront: <InboxIcon />,
      hasChildren: false,
      isChild: true,
    },
    {
      id: 4,
      name: "Researches",
      to: "",
      iconFront: <InboxIcon />,
      hasChildren: false,
      isChild: true,
    },
  ];
};
