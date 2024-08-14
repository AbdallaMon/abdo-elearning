import {Card, Typography} from '@mui/material';
import Image from 'next/image';
import SectionHeading from "@/app/components/SectionHeading/SectionHeading";
import {LevelsAnimationWrapper} from "@/app/components/AnimationsWrapper/HeroAnimations";
import Link from "next/link";
import {stages} from "@/app/constants";


export default function CourseLevelsGrid({isReview}) {
    return (
          <LevelsAnimationWrapper stages={stages}>
              <div className="py-16 bg-bgPrimary overflow-hidden">
                  <SectionHeading
                        subTitle="المراحل الدراسية"
                        title="اختر مستوى دراسي"
                  />
                  <div className={"container mx-auto"}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-8">
                          {stages.map(stage => (
                                <Link key={stage.id} className="relative flex flex-col"
                                      href={`/${isReview ? "reviews" : "lessons"}/${stage.id}/${stage.title}`}>
                                    <Card
                                          className={`card-${stage.id} w-full h-96 relative overflow-hidden rounded-lg shadow-lg bg-white transition-transform duration-300 transform hover:scale-105 hover:shadow-xl`}
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                  src={stage.imageUrl}
                                                  alt={stage.title}
                                                  layout="fill"
                                                  objectFit="cover"
                                                  className="rounded-lg"
                                            />
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full p-4">
                                            <Card className="text-center p-2">
                                                <Typography variant="h6" className="font-semibold">
                                                    {stage.title}
                                                </Typography>
                                            </Card>
                                        </div>
                                    </Card>
                                </Link>
                          ))}
                      </div>
                  </div>
              </div>
          </LevelsAnimationWrapper>

    );
}
