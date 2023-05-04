import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as React from "react";

import { Collapse } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Menuitems from "./MenuItems";

import Image from "next/image";
import logo from "../../../assets/images/logo-ujian-blue.png";

const drawerWidth = 265;

const Sidebar = ({
  handleDrawerToggle,
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  isUrl,
  data,
}) => {
  // const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const pathDirect = router.pathname;
  const location = router.pathname;
  const pathWithoutLastPart = router.pathname.slice(
    0,
    router.pathname.lastIndexOf("/")
  );

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const SidebarContent = (
    <Box pt={2} pr={2} height="100%">
      <Image className="logo" src={logo} alt="bg" />
      <Box mt={-2}>
        <List sx={{ p: 0 }}>
          {
            // Menuitems.filter((item) => {
            //   // admin
            //   if (data?.data.role === "superadmin") {
            //     return item.isSuperAdmin;
            //   } else if (data?.data.role === "admin") {
            //     return item.isAdmin;
            //   } else if (checkJobLevel(data?.data.jobLevel?.level ?? null)) {
            //     return item.isSPV;
            //   } else if (data?.data.role === "staff") {
            //     return item.isStaff;
            //   }
            //   return !item.isAdmin, !item.isSPV, !item.isStaff;
            // })
            Menuitems.map((item, index) => {
              // {/********SubHeader**********/}
              if (item.subheader) {
                return (
                  <li key={item.subheader}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="500"
                      sx={{
                        my: 2,
                        mt: 4,
                        opacity: "0.4",
                        color: (theme) => theme.palette.text.primary,
                      }}
                    >
                      {item.subheader}
                    </Typography>
                  </li>
                );
                // {/********If Sub Menu**********/}
                /* eslint no-else-return: "off" */
              } else if (item.children) {
                return (
                  <React.Fragment key={item.title}>
                    <ListItemButton
                      component="li"
                      onClick={() => handleClick(index)}
                      selected={pathWithoutLastPart === item.href}
                      sx={{
                        mb: 1,
                        borderRadius: "0 20px 20px 0",
                        ...(pathWithoutLastPart === item.href && {
                          color: "white",
                          backgroundColor: (theme) =>
                            `${theme.palette.primary.main}!important`,
                        }),
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ...(pathWithoutLastPart === item.href && {
                            color: "white",
                          }),
                        }}
                      >
                        <FeatherIcon icon={item.icon} width="20" height="20" />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          sx={{
                            ...(pathWithoutLastPart === item.href && {
                              color: "white",
                            }),
                          }}
                        >
                          {item.title}
                        </Typography>
                      </ListItemText>
                      {index === open || pathWithoutLastPart === item.href ? (
                        <FeatherIcon
                          icon="chevron-down"
                          size="16"
                          fill="white"
                        />
                      ) : (
                        <FeatherIcon
                          icon="chevron-right"
                          size="16"
                          fill="white"
                        />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={index === open || pathWithoutLastPart === item.href}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="li" disablePadding>
                        {item.children
                          // .filter((x) => {
                          //   // admin
                          //   if (role.admin === "admin") {
                          //     return x.isAdmin;
                          //   }
                          //   // supervisor atau SPV
                          //   else if (role.spv === "supervisor") {
                          //     return x.isSPV;
                          //   }
                          //   // staff
                          //   else if (role.staff === "staff") {
                          //     return x.isStaff;
                          //   }
                          //   return !x.isAdmin, !x.isSPV, !x.isStaff;
                          // })
                          // ...(pathDirect === child.href && {
                          //   "sssss"
                          // })
                          .map((child) => {
                            return (
                              <ListItem
                                key={child.title}
                                button
                                selected={pathDirect === child.href}
                                onClick={
                                  pathDirect === child.href
                                    ? null
                                    : () => router.replace(child.href)
                                }
                                sx={{
                                  mb: 1,
                                  borderRadius: "0 20px 20px 0",
                                  ...(pathDirect === child.href && {
                                    color: "primary.main",
                                    backgroundColor: "transparent!important",
                                  }),
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    svg: {
                                      width: "14px",
                                      marginLeft: "3px",
                                    },
                                    ...(pathDirect === child.href && {
                                      color: "primary.main",
                                    }),
                                  }}
                                >
                                  <FeatherIcon
                                    icon={child.icon}
                                    width="20"
                                    height="20"
                                  />
                                </ListItemIcon>
                                <ListItemText>
                                  <Typography variant="body1">
                                    {child.title}
                                  </Typography>
                                </ListItemText>
                              </ListItem>
                            );
                          })}
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
                // {/********If Sub No Menu**********/}
              } else {
                return (
                  <List component="li" disablePadding key={item.title}>
                    <NextLink href={item.href}>
                      <ListItem
                        onClick={() => handleClick(index)}
                        button
                        selected={pathDirect === item.href}
                        sx={{
                          mb: 1,
                          borderRadius: "0 20px 20px 0",
                          ...(pathDirect === item.href && {
                            color: "white",
                            backgroundColor: (theme) =>
                              `${theme.palette.primary.dark}!important`,
                          }),
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ...(pathDirect === item.href && {
                              color: "white",
                            }),
                          }}
                        >
                          <FeatherIcon
                            icon={item.icon}
                            width="20"
                            height="20"
                          />
                        </ListItemIcon>
                        <ListItemText
                        //  onClick={onSidebarClose}
                        >
                          <Typography>{item.title}</Typography>
                        </ListItemText>
                      </ListItem>
                    </NextLink>
                  </List>
                );
              }
            })
          }
        </List>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        // container={container}
        variant="temporary"
        open={isMobileSidebarOpen}
        onClose={onSidebarClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {SidebarContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open={isSidebarOpen}
      >
        {SidebarContent}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
