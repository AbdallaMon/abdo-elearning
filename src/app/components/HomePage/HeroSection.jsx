import {Typography} from "@mui/material";
import Image from "next/image";
import {HeroImageAnimation, HeroTextAnimation} from "@/app/components/AnimationsWrapper/HeroAnimations";
import {colors} from "@/app/constants";

export default function HeroSection() {
    return (
          <div
                className={
                    "h-screen w-full bg-no-repeat bg-cover bg-center pt-[80px] hero_section "
                }
                style={{
                    backgroundImage: "url(/hero/background.jpg)",
                    direction: "rtl",
                    background: colors.bgGradient
                }}
          >
              <div className={"container mx-auto h-full"}>
                  <div className={"flex flex-col lg:flex-row items-center gap-5 h-full px-4"}>
                      <div className="h-3/6 lg:h-full lg:w-3/6 flex">
                          <HeroText/>
                      </div>
                      <div className="lg:w-3/6">
                          <HeroImage/>
                      </div>
                  </div>
              </div>
          </div>
    );
}

function HeroText() {
    return (
          <HeroTextAnimation>
              <Typography
                    variant={"h3"}
                    sx={{
                        fontWeight: "bold",
                        mb: 2,
                    }}
                    color="primary.contrastText"
              >
                  مرحبا في منصة مسيو
                  <span className={"text-secondary"}> عبدالرحمن </span>
                  التعليمية </Typography>
              <Typography variant={"h4"}
                          sx={{
                              color: "#dfdfdf"
                          }}
              >
                  بنقدم كورسات لغة فرنسية للمراحل الثانوية
              </Typography>
          </HeroTextAnimation>
    );
}

function HeroImage() {
    return (
          <HeroImageAnimation>

              <Image
                    src="/hero/hero-1.png"
                    alt="hero"
                    className={"max-w-[600px] mx-auto w-full h-full "}
                    width={600}
                    height={1000}
                    style={{transform: "rotateY(180deg)"}}
              />
          </HeroImageAnimation>
    );
}
