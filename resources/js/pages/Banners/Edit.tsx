import { router, usePage } from "@inertiajs/react";
import BannerForm from "./Partials/BannerForm";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";

export default function EditBannerPage({ banner }) {
    const { breadcrumbs: rawBreadcrumbs } = usePage().props;
    const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[];
    return (
        <AppLayout>
            <BannerForm
                mode="edit"
                initialData={banner}
                onSubmit={(formData) => {
                    router.post(route("banners.update", banner.id), formData, { forceFormData: true });
                }}
            />
        </AppLayout>
    );
}
