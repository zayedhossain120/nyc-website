import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ServiceDetailTemplate,
  getServiceDetailMetadata,
} from "@/components/sections/services/service-detail-template";
import { getRelatedServiceDetails, getServiceDetail } from "@/lib/data/pennom-services";

const SLUG = "aeo-geo";
const PATH = "/services/marketing-seo/aeo-geo";

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceDetail(SLUG);
  if (!service) return {};
  return getServiceDetailMetadata(service, PATH);
}

export default function AeoGeoPage() {
  const service = getServiceDetail(SLUG);
  if (!service) notFound();
  const related = getRelatedServiceDetails(service);
  return <ServiceDetailTemplate service={service} path={PATH} related={related} />;
}