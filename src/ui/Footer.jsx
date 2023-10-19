import { Link } from "@mui/material";

function Footer() {
  return (
    <div className="flex justify-between items-center px-6 py-4 text-sm md:px-10 md:py-6 md:text-base">
      <div>
        Youtube videos pulled from Youtube Channels{" "}
        <Link href="https://www.youtube.com/channel/UCxFPHT6xj7xmgTkf-vzXylQ">
          Savage Angels
        </Link>
        , <Link href="https://www.youtube.com/@leianity">LEIA 리아</Link>, and{" "}
        <Link href="https://www.youtube.com/@KathleenCarm">Kathleen Carm</Link>
      </div>

      <div>Created by Annie Xu</div>
    </div>
  );
}

export default Footer;
