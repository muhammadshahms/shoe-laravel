import { router, usePage } from "@inertiajs/react";
import BannerForm from "./Partials/BannerForm";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";

export default function CreateBannerPage() {

    const { breadcrumbs: rawBreadcrumbs } = usePage().props;

    const breadcrumbs = (rawBreadcrumbs ?? []) as BreadcrumbItem[];


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <BannerForm
                mode="create"
                onSubmit={(formData) => {
                    router.post(route("banners.store"), formData, { forceFormData: true });
                }}
            />
        </AppLayout>
    );
}
