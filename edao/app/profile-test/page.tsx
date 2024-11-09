"use client"

import Header from "@/components/Header";
import UserProfile from "@/hooks/user-profile";
import Image from "next/image";

const ProfileTestPage = () => {
    return (
        <div className="bg-viovio/25 w-full h-screen flex flex-col items-center gap-10">

        <div className="fixed w-full">
            <Header/>
        </div>
        

        <div className="flex flex-row gap-10 pt-32">
            <Image src="/profile-pic-1.png" alt="profile pic" height={150} width={150}></Image>
            <div className="flex flex-col text-4xl pt-4">
                <div>Espoir <span className="font-bold">DIABE</span></div>
                <div className=" font text-2xl">17 years-old</div>
                <div className="flex flex-row text-2xl pt-3">
                    <Image src="/location.svg" alt="" height={30} width={30}></Image>
                    <div>Kenya</div>
                </div>
            </div>
        </div>

        <div className="flex flex-col p-5 rounded-lg bg-white text-2xl">
            <div className="flex flex-row justify-between">
                <div>
                    Accepted to <br/>
                    <span className="font-bold">Stanford University</span> <br/> <br/>
                    in <span className="font-bold">Computer Science MBS</span>
                </div>
                <Image src="/stanford.png" alt="" height={150} width={150}></Image>
            </div>
        </div>
            
       


        </div>
    );
}

export default ProfileTestPage;