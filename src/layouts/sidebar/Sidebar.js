import React from "react";
import NextLink from "next/link";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Link,
  Button,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Menuitems from "./MenuItems";
// import Buynow from "./Buynow";
import SimpleBar from "simplebar-react";
import { useRouter } from "next/router";
// import checkJobLevel from "../../../utils/checkJobLevel";

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  isUrl,
  data,
}) => {
  const role = {
    super: "superadmin",
    admin: "admin",
    spv: "supervisor",
    staff: "staff",
  };

  const [open, setOpen] = React.useState(true);
  const [dataSidebar, setDataSidebar] = React.useState([]);

  const router = useRouter();
  const pathDirect = router.pathname;
  const location = router.pathname;
  const pathWithoutLastPart = router.pathname.slice(
    0,
    router.pathname.lastIndexOf("/")
  );

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };
  const handleSubMenu = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const SidebarContent = (
    <SimpleBar style={{ height: "100%" }}>
      <Box p={2} height="100%">
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
                          <FeatherIcon
                            icon={item.icon}
                            width="20"
                            height="20"
                          />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography
                            sx={{
                              color: (theme) => theme.palette.text.primary,
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
                            .filter((x) => {
                              // admin
                              if (role.admin === "admin") {
                                return x.isAdmin;
                              }
                              // supervisor atau SPV
                              else if (role.spv === "supervisor") {
                                return x.isSPV;
                              }
                              // staff
                              else if (role.staff === "staff") {
                                return x.isStaff;
                              }
                              return !x.isAdmin, !x.isSPV, !x.isStaff;
                            })
                            .map((child) => {
                              return (
                                <NextLink
                                  key={child.title}
                                  href={child.href}
                                  onClick={onSidebarClose}
                                >
                                  <ListItem
                                    button
                                    selected={pathDirect === child.href}
                                    onClick={
                                      child.children
                                        ? null
                                        : () => handleClick(index)
                                    }
                                    sx={{
                                      mb: 1,
                                      ...(pathDirect === child.href && {
                                        color: "primary.main",
                                        backgroundColor:
                                          "transparent!important",
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
                                      <Typography
                                        variant="body1"
                                        // sx={{
                                        //   color: (theme) =>
                                        //     theme.palette.text.primary,
                                        // }}
                                      >
                                        {child.title}
                                      </Typography>
                                    </ListItemText>
                                  </ListItem>
                                </NextLink>
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
                          <ListItemText onClick={onSidebarClose}>
                            <Typography
                            // sx={{
                            //   color: (theme) => theme.palette.text.primary,
                            // }}
                            >
                              {item.title}
                            </Typography>
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

        {/* <Buynow /> */}
      </Box>
    </SimpleBar>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: "265px",
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: "265px",
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
