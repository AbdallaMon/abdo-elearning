"use client";

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {stages} from "@/app/constants";
import {handleRequestSubmit} from "@/helpers/functions/handleSubmit";
import {useToastContext} from "@/providers/ToastLoadingProvider";
import Link from "next/link";

export default function BuyButton({item, catId}) {

    const data = useSelector((state) => state.auth);
    const isLoggedIn = data.isLoggedIn;
    const [open, setOpen] = useState(false);
    const {setLoading} = useToastContext()
    const currentStage = stages.find((level) => level.id == catId);
    const [cardMessage, setCardMessage] = useState(""); // State to store the card message
    const [purchaseId, setPurchaseId] = useState(null); // State to store the purchase id

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmPurchase = async () => {
        if (isLoggedIn) {
            const result = await handleRequestSubmit({
                userId: data.id,
                lessonId: item.id,
            }, setLoading, "/student/purchase", false, "جاري اتمام العملية")
            if (result.status === 200) {
                setCardMessage(result.cardMessage);
                setPurchaseId(result.id);

            }
        }
    };

    return (
          <>
              <Button variant="contained" color="primary" className="w-full" sx={{py: 1.2}} onClick={handleClickOpen}>
                  شراء
              </Button>

              <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>{isLoggedIn ? "تأكيد الشراء" : "تسجيل الدخول مطلوب"}</DialogTitle>
                  <DialogContent>
                      {isLoggedIn ? (
                            <>
                                {cardMessage ? (
                                      <>
                                          <DialogContentText
                                                sx={{
                                                    fontSize: "1.1rem",
                                                    fontWeight: 500
                                                }}
                                          >{cardMessage}</DialogContentText>
                                          {purchaseId && (
                                                <>
                                                    <DialogContentText>
                                                        من فضلك تواصل مع المستر من أجل تفعيل الدرس واخبره برقم
                                                        العمليه: {purchaseId} ورقم الدرس: {item.id} (شكرا)
                                                    </DialogContentText>
                                                    <div className={"flex flex-col items-center"}>

                                                        <a href={`https://wa.me/+201070401821?text=${encodeURIComponent(`الكود هو ${purchaseId} ورقم الدرس هو ${item.id}`)}`}>
                                                            <Button
                                                                  variant="contained"
                                                                  color="success"
                                                                  sx={{mt: 2}}
                                                            >
                                                                تواصل مع المستر عبر واتساب
                                                            </Button>
                                                        </a>
                                                        <Link href="/dashboard/pending-purchase" color="primary"
                                                              variant="body2">
                                                            <Button color="primary" sx={{mt: 2}}>
                                                                الذهاب لرؤية جميع الدروس التي ما زالت تحت مراجعة المستر
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </>
                                          )}
                                      </>
                                ) : (
                                      <DialogContentText>
                                          أنت على وشك شراء {item?.title} من {item?.course.title} في {currentStage.title}.
                                      </DialogContentText>
                                )}
                            </>
                      ) : (
                            <DialogContentText>
                                يجب أن تكون مسجل الدخول لإجراء عملية الشراء.
                            </DialogContentText>
                      )}
                  </DialogContent>
                  {isLoggedIn && !cardMessage && (
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary">
                                إلغاء
                            </Button>
                            <Button onClick={handleConfirmPurchase} color="primary" variant="contained">
                                تأكيد
                            </Button>
                        </DialogActions>
                  )}
              </Dialog>
          </>
    );
}
