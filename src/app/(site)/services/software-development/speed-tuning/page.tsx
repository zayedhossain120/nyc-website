import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ServiceDetailTemplate,
  getServiceDetailMetadata,
} from "@/components/sections/services/service-detail-template";
import { getRelatedServiceDetails, getServiceDetail } from "@/data/service-details";

const SLUG = "speed-tuning";
const PATH = "/services/software-development/speed-tuning";

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceDetail(SLUG);
  if (!service) return {};
  return getServiceDetailMetadata(service, PATH);
}

export default function SpeedTuningPage() {
  const service = getServiceDetail(SLUG);
  if (!service) notFound();
  const related = getRelatedServiceDetails(service);
  return <ServiceDetailTemplate service={service} path={PATH} related={related} />;
}