import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
	return (
		<nav class="bg-gray-800">
			<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div class="relative flex items-center justify-between h-16">
					<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">

					</div>
				</div>
			</div>
		</nav>
	)
}
