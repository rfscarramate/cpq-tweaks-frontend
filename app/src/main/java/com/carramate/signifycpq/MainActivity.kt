package com.carramate.signifycpq

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val webView = WebView(this)
        setContentView(webView)

        webView.settings.javaScriptEnabled = true
        webView.settings.domStorageEnabled = true
        webView.settings.databaseEnabled = true
        webView.settings.allowContentAccess = true
        webView.settings.allowFileAccess = true
        webView.settings.useWideViewPort = true
        webView.settings.loadWithOverviewMode = true
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                try {
                    val js = assets.open("loader.js").bufferedReader().use { it.readText() }
                    val wrapped = "(function() { ${js}\n })();"
                    view?.evaluateJavascript(wrapped, null)
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
        webView.webChromeClient = WebChromeClient()

        // Keep cookies/storage between sessions
        webView.settings.domStorageEnabled = true
        webView.settings.databaseEnabled = true

        // Load the CPQ URL (quotes)
        webView.loadUrl("https://www.cpq.signify.com/quotes/")
    }
}
