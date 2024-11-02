import FooterCopyright from "./FooterCopyright";

export default function Footer() {
    return (
        <>
            <footer className="footer bg-navBG bg-opacity-40 text-base-content p-10 gap-8">
                <div>
                    <h2 className="text-blue-700 text-2xl font-bold">MORENT</h2>
                    <p>
                        Our vision is to provide convenience and help increase
                        your sales business.
                    </p>
                </div>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <FooterCopyright />
        </>
    );
}
