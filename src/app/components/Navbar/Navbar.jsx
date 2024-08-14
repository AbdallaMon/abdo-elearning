"use client";
import * as React from "react";
import {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {IoIosMenu} from "react-icons/io";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Image from "next/image";
import {RxAvatar} from "react-icons/rx";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {selectAuth} from "@/lib/redux/slices/authSlice";
import Drawer from "@/app/components/Navbar/Drawer";
import NavList from "@/app/components/Navbar/NavList";
import {motion, useMotionValueEvent, useScroll} from "framer-motion";
import {handleRequestSubmit} from "@/helpers/functions/handleSubmit";
import {useToastContext} from "@/providers/ToastLoadingProvider";
import {useAuth} from "@/providers/AuthProvider";
import {Container} from "@mui/material";

export default function Navbar() {
    const {isLoggedIn} = useSelector(selectAuth);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuId = "primary-menu";

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => () => {
        setState({...state, [anchor]: open});
    };

    const router = useRouter();

    const handleProfileMenuOpen = (event) => {
        if (!isLoggedIn) {
            router.push("/login"); // Redirect to the login page
        } else {
            setAnchorEl(event.currentTarget);
        }
    };

    const [navbar, setNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const {scrollY} = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > lastScrollY && latest > 100) {
            setNavbar(false);
        } else {
            setNavbar(true);
        }
        setLastScrollY(latest);
    });
    const scrollCondition = navbar && lastScrollY > 100
    const animation = {
        animate: {
            y: navbar ? 0 : -100,
            backgroundColor: scrollCondition ? "#ffffff" : "transparent",
        },
        transition: {duration: 0.3},
    };

    return (
          <motion.div
                initial={{y: -100, backgroundColor: "transparent"}}
                {...animation}
                className="fixed navbar z-50 w-full "
                dir="rtl"
          >
              <AppBar
                    className="text-heading"
                    sx={{
                        background: "inherit",
                        boxShadow:
                              navbar && lastScrollY > 100
                                    ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
                                    : "0 0 0 transparent",
                    }}
              >
                  <Drawer toggleDrawer={toggleDrawer} state={state}/>
                  <Container>
                      <Toolbar>
                          <Box sx={{display: {md: "none"}}}>
                              <IconButton
                                    size="medium"
                                    edge="start"
                                    color={scrollCondition ? "primary" : "inherit"}
                                    aria-label="فتح القائمة"
                                    onClick={toggleDrawer("left", true)}
                              >
                                  <IoIosMenu/>
                              </IconButton>
                          </Box>
                          <div style={{flex: 1, display: "flex", justifyContent: "flex-start"}}>
                              <IconButton
                                    size="medium"
                                    edge="end"
                                    aria-label="حساب المستخدم الحالي"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color={scrollCondition ? "primary" : "inherit"}
                              >
                                  <RxAvatar/>
                              </IconButton>
                          </div>
                          <div style={{flex: 1, display: "flex", justifyContent: "center"}}>
                              <NavList drawer={false}/>
                          </div>
                          <div style={{flex: 1, display: "flex", justifyContent: "flex-end"}}>
                              <Link href={"/"}>
                                  <Image src="/logo.png" alt="مسيو عبدالرحمن" width={80} height={80}/>
                              </Link>
                          </div>
                      </Toolbar>
                  </Container>
              </AppBar>
              {isLoggedIn && (
                    <AccountMenu
                          anchorEl={anchorEl}
                          menuId={menuId}
                          setAnchorEl={setAnchorEl}
                    />
              )}
          </motion.div>
    );
}

function AccountMenu({anchorEl, menuId, setAnchorEl}) {
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const {setLoading} = useToastContext();
    const {setRedirect} = useAuth();

    async function handleLogOut() {
        await handleRequestSubmit(
              {},
              setLoading,
              `auth/signout`,
              false,
              "تسجيل الخروج...",
              setRedirect,
        );
        setAnchorEl(null);
    }

    return (
          <>
              <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
              >
                  <MenuItem>
                      <Link href={`/dashboard}`}>
                          لوحة التحكم
                      </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>تسجيل الخروج</MenuItem>
              </Menu>
          </>
    );
}
