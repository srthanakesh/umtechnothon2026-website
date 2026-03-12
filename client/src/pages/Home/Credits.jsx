import React from "react";

const TeamMember = ({ name, role, github }) => (
	<div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 
	rounded-xl shadow-lg w-full max-w-sm hover:shadow-2xl transition-shadow">
		<h3 className="text-xl font-semibold text-cyan-400 mb-1">{name}</h3>
		<p className="text-gray-300 mb-3">{role}</p>
		<a
			href={github}
			target="_blank"
			rel="noopener noreferrer"
			className="text-blue-600 hover:underline flex items-center"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mr-1" viewBox="0 0 16 16">
				<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
			</svg>
			GitHub Profile
		</a>
	</div>
);

const Credits = () => {
	const team2025 = [
		{ name: "Jonas Chuan", role: "Dev Lead", github: "https://github.com/PoisonDarterz" },
		{ name: "Saiket Das", role: "Vice Dev Lead", github: "https://github.com/saiket-das" },
		{ name: "Lim Jia Le", role: "Frontend Lead", github: "https://github.com/Bonk1211" },
		{ name: "Khong Yirou", role: "Backend Lead", github: "https://github.com/stingynoodles" },
		{ name: "Teo Jing Ying", role: "Frontend Member", github: "https://github.com/JY156" },
		{ name: "Alia Maisarah binti Mahadzir", role: "Frontend Member", github: "https://github.com/nak-holidayyy" },
		{ name: "Poo Wei Shen", role: "Backend Member", github: "https://github.com/shaunn27" },
		{ name: "Tang Yvone", role: "Backend Member", github: "https://github.com/Tyvone05" }
	];
	const team2026 = [
		{
			name: "Siow Jing Yu", 
			role: "Frontend Lead", 
			github: "https://github.com/SiowJingYuakaJonathan"
		},
		{
			name:"Syakir", 
			role:"Frontend Member", 
			github:"https://github.com/niksyakir"
		},
		{
			name:"Goh Ching Yee", 
			role:"Backend Lead", 
			github:"https://github.com/ChingYee1031"
		},
		{
			name:"Thanakesh Sri Rau", 
			role:"Content/UX Lead & Integration/QA Lead", 
			github:" https://github.com/srthanakesh?tab=overview&from=2026-03-01&to=2026-03-12"
		}

	]

	return (
		<div className="flex flex-col items-center justify-center min-h-screen 
		 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0f172a] py-12 px-4 pt-24 text-white">
			<div className="w-full max-w-6xl mx-auto">
				<h1 className="text-4xl font-bold mb-2 text-center 
				drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] tracking-wide text-white">
					Meet Our Development Team
				</h1>
                
				{/* 2025 Team Members */}
				<h2 className="text-2xl md:text-3xl font-semibold text-white text-center mt-24 mb-8 
				drop-shadow[0_0_8px_rgba(34,211,238,0.6)]">
					2025 Web Development Team
				</h2>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{team2025.map((member, index) => (
						<TeamMember key={index} {...member} />
					))}
				</div>
               
			   {/* Divider */}
               <div className="my-16 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"></div>
                
                {/* 2026 Team Members */}
				<h3 className="text-2xl md:text-3xl font-semibold text-white text-center mt-14 mb-8 
				drop-shadow[0_0_8px_rgba(34,211,238,0.6)]">
					2026 Web Development Team
				</h3>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{team2026.map((member, index) => (
						<TeamMember key={index} {...member} />
					))}
				</div>

				<div className="mt-12 text-center">
					<p className="text-gray-600">Thank you for visiting our website!</p>
					<a
						href="/"
						className="mt-4 inline-block px-6 py-2 bg-[#464c92] text-white rounded-lg hover:bg-[#363b73] transition-colors"
					>
						Back to Home
					</a>
				</div>
			</div>
		</div>
	);
};

export default Credits;