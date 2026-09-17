import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ServiceDetailTemplate,
  getServiceDetailMetadata,
} from "@/components/sections/services/service-detail-template";
import { getRelatedServiceDetails, getServiceDetail } from "@/lib/data/pennom-services";

const SLUG = "technical-seo";
const PATH = "/services/marketing-seo/technical-seo";

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceDetail(SLUG);
  if (!service) return {};
  return getServiceDetailMetadata(service, PATH);
}

export default function TechnicalSeoPage() {
  const service = getServiceDetail(SLUG);
  if (!service) notFound();
  const related = getRelatedServiceDetails(service);
  return <ServiceDetailTemplate service={service} path={PATH} related={related} />;
}