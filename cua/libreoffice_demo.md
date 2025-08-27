# LibreOffice Demo for Computer-Using Agent

This demonstration shows how to use the Computer-Using Agent (CUA) capabilities to open and interact with LibreOffice on a remote desktop.

## Prerequisites

- A running remote desktop environment accessible by the Computer tool.
- The `computer` tool must be configured in the agent runtime (e.g. using the openai-cua-sample-app).
- LibreOffice should be installed in the remote environment. On Azure, you can use a virtual machine (VM) with desktop and LibreOffice.

## Steps

1. **Switch to LibreOffice**

   Use the `computer.switch_app` function to bring LibreOffice into focus. This action will launch the application if it's not already running:

   ```python
   computer.switch_app(app_name="libreoffice")
   ```

   The assistant will wait until the LibreOffice window becomes active.

2. **Open a new Writer document**

   Once LibreOffice Writer is in focus, you can perform UI interactions. For example, to create a new document and type text:

   ```python
   computer.do(actions=[
       {"action": "click", "x": 200, "y": 150, "button": 1},  # click inside the document area
       {"action": "type", "text": "This document was created by the Computer-Using Agent."}
   ])
   ```

3. **Save the document**

   To save the file via the UI, press Ctrl+S and enter a filename:

   ```python
   computer.do(actions=[
       {"action": "keypress", "keys": ["CTRL", "S"]},
       {"action": "type", "text": "cua-demo.odt"},
       {"action": "keypress", "keys": ["ENTER"]}
   ])
   ```

## Opening a web browser

To browse the internet during the same session, use `switch_app` to bring a browser (e.g. Chrome) into focus:

```python
computer.switch_app(app_name="chrome")
```

Then use `computer.do` actions to click the address bar, type a URL, and press Enter:

```python
computer.do(actions=[
    {"action": "keypress", "keys": ["CTRL", "L"]},  # focus address bar
    {"action": "type", "text": "https://www.example.com"},
    {"action": "keypress", "keys": ["ENTER"]}
])
```

The openai-cua-sample-app repository provides more guidance on how to use the computer interface, including supported actions such as `click`, `double_click`, `scroll`, `type`, `keypress`, and `drag`【606231921535403†L116-L126】. See that repository for details on deployment and environment setup.

---

This demo is for illustrative purposes and assumes that the CUA environment has been properly configured with a remote desktop, LibreOffice, and a web browser.
