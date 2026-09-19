import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ServiceDetailTemplate,
  getServiceDetailMetadata,
} from "@/components/sections/services/service-detail-template";
import { getRelatedServiceDetails, getServiceDetail } from "@/data/service-details";

const SLUG = "crm-automation";
const PATH = "/services/ai-automation/crm-automation";

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceDetail(SLUG);
  if (!service) return {};
  return getServiceDetailMetadata(service, PATH);
}

export default function CrmAutomationPage() {
  const service = getServiceDetail(SLUG);
  if (!service) notFound();
  const related = getRelatedServiceDetails(service);
  return <ServiceDetailTemplate service={service} path={PATH} related={related} />;
}