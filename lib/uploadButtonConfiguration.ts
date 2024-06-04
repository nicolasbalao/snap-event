import { CloudinaryUploadWidgetOptions } from "next-cloudinary";

const uploadButtonTranslation: object = {
  en: {
    or: "ou",
    browse: "Parcourir",
    cancel: "Annuler",
    upload: "Télécharger",
    uploading: "Téléchargement en cours...",
    uploaded: "Téléchargé",
    done: "Terminé",
    back: "Retour",
    crop: "Recadrer",
    processing: "Traitement en cours...",
    retry: "Réessayer",
    error: {
      default: "Une erreur s'est produite",
      image_too_big: "L'image est trop grande",
      invalid_file_type: "Type de fichier invalide",
      response_error: "Erreur de réponse",
      response_error_upload: "Erreur de téléchargement",
      retry: "Réessayer",
      retry_upload: "Réessayer le téléchargement",
      retry_cropping: "Réessayer le recadrage",
      upload_aborted: "Téléchargement annulé",
      upload_failed: "Échec du téléchargement",
    },
    menu: {
      files: "Fichiers",
      camera: "Caméra",
    },
    local: {
      browse: "Parcourir",
      dd_title_single: "Faites glisser et déposez des images ici",
      dd_title_multi: "Faites glisser et déposez des images ici",
    },
    camera: {
      capture: "Prendre une photo",
      cancel: "Annuler",
      take_pic: "Prendre une photo et télécharger",
      explanation:
        "Assurez-vous que votre caméra est connectée et que votre navigateur autorise la capture de caméra. Lorsque vous êtes prêt, cliquez sur Capture.",

      camera_error: "Echec de l'accès à la caméra",
      retry: "Réessayer",
      file_name: "Camera_{{time}}",
    },
    queue: {
      title: "File d'attente de téléchargement",
      title_uploading_with_counter: "Téléchargement de {{num}} éléments",
      title_processing_with_counter: "Traitement de {{num}} éléments",
      title_uploading_processing_with_counters:
        "Téléchargement de {{uploading}} éléments, traitement de {{processing}} éléments",
      title_uploading: "Téléchargement d'éléments",
      mini_title: "Téléchargé",
      mini_title_uploading: "Téléchargement",
      mini_title_processing: "Traitement",
      show_completed: "Afficher terminé",
      retry_failed: "Réessayer l'échec",
      abort_all: "Tout abandonner",
      upload_more: "Télécharger plus",
      done: "Terminé",
      mini_upload_count: "{{num}} téléchargé",
      mini_failed: "{{num}} échoué",
      statuses: {
        uploading: "Téléchargement...",
        processing: "Traitement...",
        timeout:
          "Un gros fichier est actuellement en cours de téléchargement. Il peut prendre un certain temps pour apparaître dans votre environnement de produit.",
        error: "Erreur",
        uploaded: "Terminé",
        aborted: "Abandonné",
      },
    },
  },
};
export const uploadButtonOptions: CloudinaryUploadWidgetOptions = {
  sources: ["local", "camera"],
  language: "en",
  text: uploadButtonTranslation,
  clientAllowedFormats: ["jpg", "png", "jpeg", "svg"],
};
