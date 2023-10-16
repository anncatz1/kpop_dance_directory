import { Link } from "@mui/material";

function Footer() {
  return (
    <div className="flex justify-between items-center px-10 py-6">
      <div className="">
        Youtube videos pulled from Youtube Channels{" "}
        <Link href="https://www.youtube.com/channel/UCxFPHT6xj7xmgTkf-vzXylQ">
          Savage Angels
        </Link>
        , <Link href="https://www.youtube.com/@leianity">LEIA 리아</Link>, and{" "}
        <Link href="https://www.youtube.com/@KathleenCarm">Kathleen Carm</Link>
      </div>

      <div>Website created by Annie Xu</div>
    </div>
  );
}

export default Footer;
