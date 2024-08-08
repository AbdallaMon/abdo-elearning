import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useToastContext } from "@/providers/ToastLoadingProvider";
import { useAuth } from "@/providers/AuthProvider";
import { handleRequestSubmit } from "../../../helpers/functions/handleSubmit";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import IconButton from "@mui/material/IconButton";
import {colors} from "@/app/constants";

export default function DashboardDrawer({ listData }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div className={"block lg:hidden"}>
      <Button onClick={toggleDrawer(true)} className={"fixed"}>
        <IconButton>
          <GiHamburgerMenu size={30} />
        </IconButton>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"left"}>
        <DrawerList data={listData} toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
}

export function DrawerList({ data, toggleDrawer }) {
  const { setLoading } = useToastContext();
  const { setRedirect } = useAuth();
  const pathName = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const signout = await handleRequestSubmit(
      {},
      setLoading,
      `auth/signout`,
      false,
      "Logging out...",
      setRedirect,
    );
    if (signout?.status === 200) {
      router.push("/login");
    }
  }
  return (
    <Box
      onClick={toggleDrawer && toggleDrawer(false)}
      className={" p-5 lg:shadow-xl  w-[300px] bg-white"}
    >
      <Link href={"/"}>
        <Image src="/logo.png" alt="Edu " width={80} height={80} /> {/* #todo Logo alt */}
      </Link>
      <List className={"w-full"}>
        {data.map((item) => {
          if (item.text === "Logout")
            return (
              <ListItem key={item.id} onClick={handleLogout} sx={{
                py:1
              }}>
                <ListItemButton
                      sx={{       py:1,
                        "&:hover": {
                          backgroundColor: "#e53f33",
                          color: "white",
                        },
                        borderRadius: 1
                      }}
                >
                  <ListItemText primary={item.text} className={"capitalize"} />
                </ListItemButton>
              </ListItem>
            );
          return (
            <ListItem key={item.id}  sx={{
              py:0.5
            }}>
              <Link href={item.href} className={"block w-full ]"}>
                <ListItemButton
                  sx={{
                    py:1,
                    "&:hover": {
                      backgroundColor: colors.primary,
                      color: "white",
                    },
        backgroundColor: pathName === item.href ? colors.primary : "transparent",
        color: pathName === item.href ? "white" : colors.body,
                    borderRadius: 1
                    }}
                >
                  <ListItemText primary={item.text} className={"capitalize "} />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
