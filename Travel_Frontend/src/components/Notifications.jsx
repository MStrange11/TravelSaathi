import React from 'react';
import { angelaGray, annaKim, jacobThompson, kimberlySmith, markWebber, nathanPeterson, rizkyHassanuddin, imageChess } from "../assets/images/index";
import { GoDotFill } from "react-icons/go";

const notificationsData = [
    {
        id: 1,
        user: 'Mark Webber',
        imgSrc: markWebber,
        notification: '',
        time: '',
        action: '',
        isNew: true,
        timeAgo: ''
    },
    {
        id: 2,
        user: 'Angela Gray',
        imgSrc: angelaGray,
        notification: 'followed you',
        time: '5m ago',
        action: '',
        isNew: true,
        timeAgo: '5m ago'
    },
    {
        id: 3,
        user: 'Jacob Thompson',
        imgSrc: jacobThompson,
        notification: 'has joined your group',
        action: 'Chess Club',
        isNew: true,
        timeAgo: '1 day ago'
    },
    {
        id: 4,
        user: 'Rizky Hasanuddin',
        imgSrc: rizkyHassanuddin,
        notification: 'sent you a private message',
        action: 'Hello, thanks for setting up the Chess Club. I\'ve been a member for a few weeks now and I\'m already having lots of fun and improving my game.',
        isNew: false,
        timeAgo: '5 days ago'
    },
    {
        id: 5,
        user: 'Kimberly Smith',
        imgSrc: kimberlySmith,
        notification: 'commented on your picture',
        action: 'chess',
        isNew: false,
        timeAgo: '1 week ago'
    },
    {
        id: 6,
        user: 'Nathan Peterson',
        imgSrc: nathanPeterson,
        notification: 'reacted to your recent post',
        action: '5 end-game strategies to increase win rate',
        isNew: false,
        timeAgo: '2 weeks ago'
    },
    {
        id: 7,
        user: 'Anna Kim',
        imgSrc: annaKim,
        notification: 'left the group',
        action: 'Chess Club',
        isNew: false,
        timeAgo: '2 weeks ago'
    },
];

function Notifications() {
    return (
        <>
            <div className="h-screen md:h-full bg-Light-grayish-blue-1 flex justify-center items-center mt-24">
                <div className="flex flex-col w-full md:w-[600px] bg-White p-4 rounded-none md:rounded-xl shadow-2xl">
                    {/* top feed */}
                    <div className="flex flex-row justify-between items-center mb-3">
                        <div className="flex flex-row items-center gap-3">
                            <h3 className="text-Very-dark-blue font-semibold text-2xl">Notifications</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        {notificationsData.map((notification) => (
                            <div
                                key={notification.id}
                                className={`flex flex-row ${notification.isNew ? 'bg-Very-light-grayish-blue' : ''} px-3 py-2 rounded-lg gap-3`}
                            >
                                <img src={notification.imgSrc} alt={notification.user} loading="lazy" className="w-[50px] h-[50px]" />
                                <div className="flex flex-col gap-2 relative">
                                    <div className="flex flex-row gap-1">
                                        <p className="text-sm text-Dark-grayish-blue p-after">
                                            <span className="text-Very-dark-blue font-bold text-base cursor-pointer hover:text-Blue">
                                                {notification.user}
                                            </span>{' '}
                                            {notification.notification}
                                        </p>
                                    </div>
                                    <div className="justify-start flex gap-2">
                                        <button className="bg-blue-500 text-white py-1 px-4 rounded-lg hover:bg-blue-600 transition">Accept</button>
                                        <button className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition">Reject</button>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
}

export default Notifications;