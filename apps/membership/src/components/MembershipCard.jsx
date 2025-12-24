import React, { forwardRef } from 'react';
import template from './MembershipCard.png';

const MembershipCard = forwardRef(({ member }, ref) => {
    if (!member) return null;

    return (
        <div ref={ref} className="relative w-full max-w-[500px] rounded-xl overflow-hidden shadow-2xl bg-black">
            {/* Background Template - Let image define height naturally */}
            <img src={template} alt="Card Template" className="w-full h-auto object-cover block" />

            {/* Dynamic Content Overlay */}
            <div className="absolute inset-0 z-10 font-display">

                {/* Member Name Overlay - Shifted down to clear the 'Name' label */}
                <div className="absolute top-[42%] left-[9%] w-[60%] flex flex-col justify-center h-[18%]">
                    <h3
                        className={`text-white font-bold uppercase tracking-wide filter drop-shadow-[0_0_8px_rgba(0,243,255,0.5)] ${member.fullName.includes(' ') && member.fullName.length > 14
                                ? 'text-sm sm:text-base leading-tight whitespace-normal line-clamp-2 break-words' // Space & >14: Wrap, smaller
                                : !member.fullName.includes(' ') && member.fullName.length > 15
                                    ? 'text-[10px] sm:text-xs leading-none break-all' // No space & long: Tiny, break-all
                                    : 'text-lg sm:text-xl truncate' // Default: Large, single line
                            }`}
                    >
                        {member.fullName}
                    </h3>
                </div>

                {/* Membership ID Overlay - Shifted down to clear the 'Membership ID' label */}
                <div className="absolute top-[62%] left-[9%] w-[60%]">
                    <p className="text-white font-mono text-base sm:text-lg tracking-wider font-bold filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                        {member.id}
                    </p>
                </div>
            </div>
        </div>
    );
});

MembershipCard.displayName = 'MembershipCard';

export default MembershipCard;
