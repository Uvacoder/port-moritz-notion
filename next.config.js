/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.gr-assets.com', // oku.club assets
      's3.us-west-2.amazonaws.com', // notion api images
      'books.google.com', // google books
    ],
  },
  async rewrites() {
    return [
	    {
	      source: "/bee.js",
	      destination: "https://cdn.splitbee.io/sb.js",
	    },
	    {
	      source: "/_hive/:slug",
	      destination: "https://hive.splitbee.io/:slug",
	    },
	  ];
  },
}
