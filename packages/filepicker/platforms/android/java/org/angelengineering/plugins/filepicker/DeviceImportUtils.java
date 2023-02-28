package org.angelengineering.plugins.filepicker;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class DeviceImportUtils {

    public static boolean copyFileFromUri(Activity activity, Uri uri, String outputFileName) {
        final File outputFile = new File(outputFileName);
        // System.out.println("created output file "+outputFileName);        
        try (
            InputStream inputStream = activity.getContentResolver().openInputStream(uri);
            OutputStream outputStream = new FileOutputStream(outputFile);
        ) {
            byte[] buffer = new byte[4 * 1024];
            int read;
            while ((read = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, read);
            }
            outputStream.flush();
            //clean up this file on app exit
            outputFile.deleteOnExit();            
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    }
}





// package org.nativescript.plugins.camera;
// import java.io.InputStream;
// import java.io.OutputStream;
// import java.io.IOException;
// public class Utils {
//     public static void copy(InputStream source, OutputStream target) throws IOException {
//         byte[] buf = new byte[4096];
//         int length;
//         while ((length = source.read(buf)) > 0) {
//             target.write(buf, 0, length);
//         }
//     }
// }