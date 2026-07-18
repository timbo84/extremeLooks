import Link from "next/link";
import Image from "next/image";
import { Camera } from "lucide-react";
import styles from "./page.module.css";

const team = [
  {
    name: "Alexis Monroe",
    img: "/images/headshot1.jpg",
    role: "Master Stylist & Salon Director",
    experience: "12 Years",
    bio: "Alexis founded Extreme Looks with a single vision: to make every client feel like the most beautiful version of themselves. With training from top academies in New York and London, she brings a global perspective to every cut and color. Her specialty lies in lived-in color and precision cutting.",
    specialties: ["Balayage", "Precision Cuts", "Color Theory", "Hair Health"],
    certifications: ["L'Oréal Color Certified", "Redken Shades EQ Master", "Vidal Sassoon Graduate"],
    instagram: "#",
  },
  {
    name: "Jordan Lee",
    img: "/images/headshot2.jpg",
    role: "Color Specialist",
    experience: "9 Years",
    bio: "Jordan's passion for color began in art school and never stopped. After studying coloristry in Paris and working in several award-winning salons, he joined Extreme Looks to push creative boundaries. Whether you want seamless naturals or bold vivids, Jordan delivers.",
    specialties: ["Vivid Color", "Blonding", "Color Correction", "Lived-In Color"],
    certifications: ["Wella Color Master", "Schwarzkopf Expert", "Olaplex Certified"],
    instagram: "#",
  },
  {
    name: "Morgan Rivera",
    img: "/images/headshot3.jpg",
    role: "Senior Stylist",
    experience: "7 Years",
    bio: "Morgan is the go-to for extensions and healthy hair transformations. Brazilian blowout certified and trained in tape-in, weft, and micro-link systems. She's also one of our most sought-after bridal stylists, with dozens of weddings under her belt.",
    specialties: ["Extensions", "Keratin Treatments", "Bridal Styling", "Healthy Hair"],
    certifications: ["Brazilian Blowout Certified", "Hair Vivi Extensions Trainer", "Bridal Hair Artist"],
    instagram: "#",
  },
  {
    name: "Taylor Brooks",
    img: "/images/headshot4.jpg",
    role: "Stylist",
    experience: "5 Years",
    bio: "Taylor came up through barbering before transitioning to a full salon environment. This crossover background gives every cut a razor-sharp foundation. Specializing in textured men's cuts, fades, and modern shags — Taylor brings energy to every appointment.",
    specialties: ["Men's Cuts", "Fade Techniques", "Razor Work", "Textured Cuts"],
    certifications: ["Licensed Cosmetologist", "Licensed Barber", "American Crew Certified"],
    instagram: "#",
  },
  {
    name: "Casey Nguyen",
    img: "/images/headshot5.jpg",
    role: "Stylist",
    experience: "4 Years",
    bio: "Casey is our resident curl specialist. After spending two years studying curly hair methodology under leading curl educators, Casey understands how to honor every curl pattern. If you have naturally curly or wavy hair, Casey knows exactly what your hair needs.",
    specialties: ["Curly Hair", "DevaCut", "Wavy Hair", "Dry Cutting"],
    certifications: ["DevaCurl Certified", "Curly Girl Method Trained"],
    instagram: "#",
  },
  {
    name: "Riley Stone",
    img: "/images/headshot6.jpg",
    role: "Junior Stylist & Color Assistant",
    experience: "2 Years",
    bio: "Riley is our newest full-time stylist and already making waves. Fresh out of advanced training with a deep passion for balayage and glossing services, Riley brings enthusiasm and precision to every guest.",
    specialties: ["Glossing", "Balayage Assist", "Blow Styling", "Color Prep"],
    certifications: ["State Licensed Cosmetologist"],
    instagram: "#",
  },
];

export default function TeamPage() {
  return (
    <>      <div className={styles.pageWrap}>
        {/* Hero */}
        <div className={styles.hero}>
          <div className="container">
            <span className="section-label">The People Behind Your Look</span>
            <h1 className={styles.heroTitle}>Meet Our Team</h1>
            <p className={styles.heroSub}>
              Our stylists are artists, educators, and color scientists. Each brings their own
              unique expertise — together, we cover every hair need imaginable.
            </p>
          </div>
        </div>

        {/* Team grid */}
        <div className={styles.body}>
          <div className="container">
            <div className={styles.teamGrid}>
              {team.map((member) => (
                <div key={member.name} className={styles.card}>
                  {/* Photo */}
                  <div className={styles.photoWrap}>
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                    <a href={member.instagram} className={styles.instaBtn} aria-label="Instagram">
                      <Camera size={14} />
                    </a>
                  </div>

                  {/* Info */}
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
                      <span className={styles.experience}>{member.experience} Experience</span>
                    </div>
                    <h2 className={styles.cardName}>{member.name}</h2>
                    <p className={styles.cardRole}>{member.role}</p>
                    <p className={styles.cardBio}>{member.bio}</p>

                    {/* Specialties */}
                    <div className={styles.section}>
                      <p className={styles.sectionLabel}>Specialties</p>
                      <div className={styles.tags}>
                        {member.specialties.map(s => (
                          <span key={s} className={styles.tag}>{s}</span>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className={styles.section}>
                      <p className={styles.sectionLabel}>Certifications</p>
                      <ul className={styles.certList}>
                        {member.certifications.map(c => (
                          <li key={c} className={styles.certItem}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <Link href="/booking" className="btn-primary" style={{ marginTop: 4 }}>
                      Book with {member.name.split(" ")[0]}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Join the team */}
        <div className={styles.joinBanner}>
          <div className="container" style={{ textAlign: "center" }}>
            <span className="section-label">Careers</span>
            <h2 className={styles.joinTitle}>Join Our Team</h2>
            <p className={styles.joinSub}>
              We&apos;re always looking for passionate, talented stylists to grow with us. If you
              love the craft and want to be part of something special, reach out.
            </p>
            <a href="mailto:hello@extremelooks.com" className="btn-outline">
              Send Your Portfolio
            </a>
          </div>
        </div>
      </div>    </>
  );
}
