
 function validateImage(input, previewId, maxW, maxH, maxSizeMB) {
            const file = input.files[0];
            if (!file) return { success: false };

            // Check file size (between 1KB and maxSizeMB)
            const fileSizeKB = file.size / 1024;
            if (fileSizeKB < 1 || fileSizeKB > maxSizeMB * 1024) {
                alert(`Invalid file size! Allowed range: 1KB to ${maxSizeMB}MB.`);
                input.value = "";
                return { success: false };
            }

            // Check dimensions (min 1x1, maxW x maxH, allow either orientation)
            const img = new Image();
            img.onload = function () {
                const w = this.width;
                const h = this.height;
                const validDim =
                    w >= 1 &&
                    h >= 1 &&
                    ((w <= maxW && h <= maxH) || (w <= maxH && h <= maxW));

                if (!validDim) {
                    alert(
                        `Invalid dimensions! Actual ${w}×${h}. ` +
                        `Allowed up to ${maxW}×${maxH} px (either orientation).`
                    );
                    input.value = "";
                    return { success: false };
                } else {
                    // Show preview
                    const preview = document.getElementById(previewId);
                    preview.src = URL.createObjectURL(file);
                    preview.style.display = "block";
                    // return some useful info synchronously via global state
                    input.__lastImageInfo = { width: w, height: h, sizeKB: Math.round(file.size / 1024), name: file.name };
                    return { success: true };
                }
            };
            img.src = URL.createObjectURL(file);
            // since load is async, caller should inspect input.__lastImageInfo later
            return { success: true };
        }


let currentStep = 1;
    const totalSteps = 3;


    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const nextLabel = nextBtn ? nextBtn.querySelector(".next-label") : null;

    function showStep(step) {
      // Hide all step content
      document.querySelectorAll(".process-content").forEach(el => el.classList.add("d-none"));
      document.getElementById(`step-${step}`).classList.remove("d-none");

      // Update active step circles: only current step gets 'active'
      document.querySelectorAll(".step").forEach((el, index) => {
        if (index === step - 1) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });

      // Hide/show process-bar-next-btn (navigation buttons)
      var navBar = document.querySelector('.process-bar-next-btn');
      if (navBar) {
        if (step === totalSteps) {
          navBar.style.display = 'none';
        } else {
          navBar.style.display = '';
        }
      }

      // Disable/enable .new-ppt links
      document.querySelectorAll('.new-ppt').forEach(link => {
        if (step === totalSteps) {
          link.classList.remove('disabled');
          link.setAttribute('tabindex', '0');
          link.setAttribute('aria-disabled', 'false');
        } else {
          link.classList.add('disabled');
          link.setAttribute('tabindex', '-1');
          link.setAttribute('aria-disabled', 'true');
        }
      });

      // Disable Continue button on first step
      if (step === 1) {
        if (nextBtn) nextBtn.disabled = true;
      } else {
        if (nextBtn) nextBtn.disabled = false;
      }

      // Hide Previous button in Step 1
      if (step === 1) {
        if (prevBtn) prevBtn.classList.remove("visible");
      } else {
        if (prevBtn) prevBtn.classList.add("visible");
      }
      // Change Next button text on last step
      if (nextLabel) nextLabel.innerHTML = step === totalSteps ? "Continue" : "Continue";
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (currentStep < totalSteps) {
          currentStep++;
          showStep(currentStep);
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentStep > 1) {
          currentStep--;
          showStep(currentStep);
        }
      });
    }


    // Enable Continue button on step 1 only if both client and project are selected
    function checkStep1Selections() {
      if (currentStep !== 1) return;
      var client = document.querySelector('input[name="cliente"]:checked');
      var project = document.querySelector('input[name="progetto"]:checked');
      if (nextBtn) nextBtn.disabled = !(client && project);
    }

    // Listen for changes on step 1 radio buttons
    document.querySelectorAll('input[name="cliente"], input[name="progetto"]').forEach(input => {
      input.addEventListener('change', checkStep1Selections);
    });

    // Initialize
    showStep(currentStep);
    checkStep1Selections();

    document.querySelectorAll(".pre-next-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });



// Color Picker

    // Color pickers: attach listeners only if elements exist
    const colorPicker1 = document.getElementById('colorPicker1');
    const colorCode1 = document.getElementById('colorCode1');
    if (colorPicker1 && colorCode1) {
      colorPicker1.addEventListener('input', function () {
        colorCode1.value = colorPicker1.value;
      });
      colorCode1.addEventListener('input', function () {
        if (/^#[0-9A-F]{6}$/i.test(colorCode1.value)) {
          colorPicker1.value = colorCode1.value;
        }
      });
    }

    const colorPicker2 = document.getElementById('colorPicker2');
    const colorCode2 = document.getElementById('colorCode2');
    if (colorPicker2 && colorCode2) {
      colorPicker2.addEventListener('input', function () {
        colorCode2.value = colorPicker2.value;
      });
      colorCode2.addEventListener('input', function () {
        if (/^#[0-9A-F]{6}$/i.test(colorCode2.value)) {
          colorPicker2.value = colorCode2.value;
        }
      });
    }

      // Logo and Cover upload preview and info logic with validation (hide/show entire upload area)
      if (!window.__logoCoverListenersInstalled) {
        window.__logoCoverListenersInstalled = true;
        document.addEventListener("DOMContentLoaded", function () {
          // --- Logo Upload Logic ---
          var logoInput = document.getElementById("logoInput");
          var logoPreview = document.getElementById("logoPreview");
          var logoPreviewContainer = document.querySelector(
            ".logo-preview-container"
          );
          var logoUploadArea = logoInput
            ? logoInput.closest(".logo-upload-area")
            : null;
          var addLogoContent = logoInput
            ? logoInput.closest(".add-img-content")
            : null;
          var logoMeta = logoPreviewContainer
            ? logoPreviewContainer.querySelector(".logo-meta")
            : null;
          var removeLogoBtn = document.getElementById("removeLogoBtn");
          if (
            logoInput &&
            logoPreview &&
            logoPreviewContainer &&
            addLogoContent &&
            logoMeta &&
            removeLogoBtn &&
            logoUploadArea
          ) {
            // Make the entire upload area clickable (except the input itself)
            logoUploadArea.style.cursor = "pointer";
            logoUploadArea.addEventListener("click", function (e) {
              if (e.target !== logoInput) {
                logoInput.click();
              }
            });
            logoInput.addEventListener("change", function () {
              var file = logoInput.files[0];
              if (!file) return;
              // --- Validation for logo: max 512x512px, max 5MB ---
              var fileSizeKB = file.size / 1024;
              if (fileSizeKB < 1 || fileSizeKB > 5 * 1024) {
                alert("Invalid file size! Allowed range: 1KB to 5MB.");
                logoInput.value = "";
                return;
              }
              var img = new Image();
              img.onload = function () {
                var w = this.width;
                var h = this.height;
                var maxW = 512,
                  maxH = 512;
                var validDim =
                  w >= 1 &&
                  h >= 1 &&
                  ((w <= maxW && h <= maxH) || (w <= maxH && h <= maxW));

                if (!validDim) {
                  alert(
                    `Invalid dimensions! Actual ${w}×${h}. Allowed up to ${maxW}×${maxH} px (either orientation).`
                  );
                  logoInput.value = "";
                } else {
                  // Hide entire upload area, show preview UI
                  logoUploadArea.style.display = "none";
                  logoPreviewContainer.style.display = "flex";
                  logoPreview.src = img.src;
                  var sizeKB = Math.round(file.size / 1024);
                  logoMeta.innerHTML =
                    '<p style="color:#000000"> <strong>' +
                    file.name +
                    "</strong></p>" +
                    "<p>misurare: " +
                    sizeKB +
                    " KB</p>" +
                    "<p>Dimensione: " +
                    w +
                    "px x " +
                    h +
                    "px</p>";
                }
              };
              img.src = URL.createObjectURL(file);
            });
            removeLogoBtn.addEventListener("click", function () {
              // Reset UI
              logoInput.value = "";
              logoPreview.src = "";
              logoPreviewContainer.style.display = "none";
              logoUploadArea.style.display = "";
            });
          }

          // --- Cover Upload Logic ---
          var coverInput = document.getElementById("coverInput");
          var coverPreview = document.getElementById("coverPreview");
          var coverPreviewContainer = document.querySelector(
            ".cover-preview-container"
          );
          var coverUploadArea = coverInput
            ? coverInput.closest(".cover-upload-area")
            : null;
          var addCoverContent = coverInput
            ? coverInput.closest(".add-img-content")
            : null;
          var coverMeta = coverPreviewContainer
            ? coverPreviewContainer.querySelector(".cover-meta")
            : null;
          var removeCoverBtn = document.getElementById("removeCoverBtn");
          if (
            coverInput &&
            coverPreview &&
            coverPreviewContainer &&
            addCoverContent &&
            coverMeta &&
            removeCoverBtn &&
            coverUploadArea
          ) {
            // Make the entire upload area clickable (except the input itself)
            coverUploadArea.style.cursor = "pointer";
            coverUploadArea.addEventListener("click", function (e) {
              if (e.target !== coverInput) {
                coverInput.click();
              }
            });
            coverInput.addEventListener("change", function () {
              var file = coverInput.files[0];
              if (!file) return;
              // --- Validation for cover: max 1024x800px, max 10MB ---
              var fileSizeKB = file.size / 1024;
              if (fileSizeKB < 1 || fileSizeKB > 10 * 1024) {
                alert("Invalid file size! Allowed range: 1KB to 10MB.");
                coverInput.value = "";
                return;
              }
              var img = new Image();
              img.onload = function () {
                var w = this.width;
                var h = this.height;
                var maxW = 1024,
                  maxH = 800;
                var validDim =
                  w >= 1 &&
                  h >= 1 &&
                  ((w <= maxW && h <= maxH) || (w <= maxH && h <= maxW));

                if (!validDim) {
                  alert(
                    `Invalid dimensions! Actual ${w}×${h}. Allowed up to ${maxW}×${maxH} px (either orientation).`
                  );
                  coverInput.value = "";
                } else {
                  // Hide entire upload area, show preview UI
                  coverUploadArea.style.display = "none";
                  coverPreviewContainer.style.display = "flex";
                  coverPreview.src = img.src;
                  var sizeKB = Math.round(file.size / 1024);
                  coverMeta.innerHTML =
                    '<p style="color:#000000"> <strong>' +
                    file.name +
                    "</strong></p>" +
                    "<p>misurare: " +
                    sizeKB +
                    " KB</p>" +
                    "<p>Dimensione: " +
                    w +
                    "px x " +
                    h +
                    "px</p>";
                }
              };
              img.src = URL.createObjectURL(file);
            });
            removeCoverBtn.addEventListener("click", function () {
              // Reset UI
              coverInput.value = "";
              coverPreview.src = "";
              coverPreviewContainer.style.display = "none";
              coverUploadArea.style.display = "";
            });
          }
        });

      // Make .pptx-uploaded and #actionBtn clickable to open the hidden file input (only one event listener)
      if (!window.__pptxUploadListenersInstalled) {
        window.__pptxUploadListenersInstalled = true;
        document.addEventListener("DOMContentLoaded", function () {
          var uploadArea = document.querySelector(".pptx-uploaded");
          var fileInput = document.getElementById("pptxFile");
          var actionBtn = document.getElementById("actionBtn");
          if (uploadArea && fileInput) {
            uploadArea.style.cursor = "pointer";
            uploadArea.addEventListener("click", function (e) {
              if (e.target.id !== "actionBtn") {
                fileInput.click();
              }
            });
          }
          if (actionBtn && fileInput) {
            actionBtn.addEventListener("click", function (e) {
              e.preventDefault();
              fileInput.click();
            });
          }
          // Auto-upload when file selected
          if (fileInput) {
            fileInput.addEventListener("change", function () {
              if (fileInput.files.length) {
                var file = fileInput.files[0];
                var ext = file.name.split(".").pop().toLowerCase();
                if (ext !== "xlsx" && ext !== "png") {
                  alert("Formato non supportato! Seleziona un file XLSX o PNG.");
                  fileInput.value = "";
                  return;
                }
                // Optional: Add size validation if needed
                // XLSX: max 10MB, PNG: max 5MB
                var maxSize = ext === "xlsx" ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
                if (file.size > maxSize) {
                  alert(
                    "File troppo grande! Limite: " +
                      (ext === "xlsx" ? "10MB" : "5MB")
                  );
                  fileInput.value = "";
                  return;
                }
                if (typeof handleFile === "function") handleFile();
              }
            });
          }
        });
      }
    }

     