import { whyKaionex } from "@/content/faq";
import { Reveal } from "@/components/ui/Reveal";
import { Layers3, Eye, MapPin, UsersRound, WifiOff, ArrowRight } from "lucide-react";

const groups = [
  { title: "Purpose-Built Software", icon: Layers3, items: [0], signals: ["POS", "EMS", "FMS", "E-Commerce"] },
  { title: "Operational Visibility", icon: Eye, items: [1, 5], signals: ["Stock", "Orders", "Revenue", "Reports"] },
  { title: "Multi-location Operations", icon: MapPin, items: [4, 2], signals: ["Counter", "Store", "Warehouse", "Branch"] },
  { title: "Access & Team Workflows", icon: UsersRound, items: [3, 7], signals: ["Roles", "People", "Tasks", "Communication"] },
  { title: "Offline-Ready POS", icon: WifiOff, items: [6], signals: ["Billing", "Local records", "Reconnect", "Sync"] },
];

export function WhyKaionex() {
  return <section className="cine-benefits">
    <div className="cine-benefits-header"><p className="cine-eyebrow">WHY KAIONEX</p><h2 className="cine-heading">Less fragmentation.<br /><em>More focus.</em></h2><p>Purpose-built software for different parts of your business.<br />Cohesive tools designed under one brand to help your team operate with clarity.</p></div>
    <div className="cine-benefits-list">{groups.map(({ title, icon: Icon, items, signals }, index) => <Reveal key={title} y={12}>
      <article className={"cine-benefit " + (index === 0 ? "cine-benefit-anchor" : "")}>
        <span className="cine-benefit-number">{String(index + 1).padStart(2, "0")}</span>
        <div className="cine-benefit-title"><Icon size={24} aria-hidden /><h3>{title}</h3></div>
        <div className="cine-benefit-content">{items.map(i => <p key={i}>{whyKaionex[i].description}</p>)}<div className="cine-benefit-signals" aria-hidden>{signals.map((label,i) => <span key={label}>{label}{i < signals.length - 1 && <ArrowRight size={12} />}</span>)}</div>{index === 0 && <span className="cine-benefit-future">KAIONEX PRODUCT SUITE · CRM Coming Soon</span>}</div>
      </article>
    </Reveal>)}</div>
  </section>;
}
